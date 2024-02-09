import prisma from "../database/prismaClient.js";
import { dispatchJsonToken } from "../utils/dispatchToken.js";
import Errorhandler from "../utils/errorhandler.js";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";
import getGoogleAuth from "../utils/google.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import pair from "../utils/keyPair.js";

export const signUp = async (req, res, next) => {
  try {
    const { email, password, username, roleAdmin } = req.body;
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return next(new Errorhandler(400, "User Already Exists"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = {
      email,
      password: hashedPassword,
      username,
      roleAdmin,
    };
    const user = await prisma.user.create({
      data,
    });

    res.status(201).json({
      message: "Successfully Created",
    });
  } catch (e) {
    next(e);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      return next(new Errorhandler(404, "User Not Found"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new Errorhandler(400, "Invalid Credentials"));
    }

    dispatchJsonToken(user, 201, res);
  } catch (e) {
    next(e);
  }
};

export const reset = async (req, res, next) => {
  try {
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const email = req.body.email; 
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      return next(new Errorhandler(404, "User Not Found"));
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    await prisma.user.update({
      where: { email: email },
      data: {
        resetToken: resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000),
      },
    });
    const msg = {
      to: email, // Change to your recipient
      from: "hungrygrabo@gmail.com", // Change to your verified sender
      subject: "Password Reset Request",  
      text: "Mkart V3",
      html: `
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              .container {
                  width: 80%;
                  margin: auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 5px;
              }
              .button {
                  background-color: #4CAF50;
                  border: none;
                  color: white;
                  padding: 15px 32px;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  font-size: 16px;
                  margin: 4px 2px;
                  cursor: pointer;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Password Reset Request</h2>
              <p>Hello,</p>
              <p>We received a request to reset your password. Click the button below to reset it.</p>
              <a href="http://localhost:3000/reset/${resetToken}" class="button">Reset Password</a>
              <p>If you didn't request this, please ignore this email.</p>
              <p>Thanks,</p>
              <p>Your Team</p>
          </div>
      </body>
      `,
    };

    const response= await sgMail.send(msg);
    res.status(response[0].statusCode).json({
      message: "Email Sent",
    });
  } catch (e) {
    
    next(e);
  }
};

export const newPassword = async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        resetToken: resetToken,
        resetTokenExpiry: {
          gte: new Date(Date.now() - 3600000),
        },
      },
    });
    if (!user) {
      return next(new Errorhandler(400, "Invalid Token"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: { resetToken: resetToken , id: user.id},
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    res.status(200).json({
      message: "Password Updated",
    });
  } catch (e) {
    next(e);
  }
}

export  const googleAuth = async (req, res, next) => {
    try {
        const url=getGoogleAuth();
        console.log(url);
        res.json(url);
    } catch (e) {
        next(e);
    }
}

export const googleAuthHandler = async (req, res, next) => {
    try {
        const code = req.query.code;
        const url = `https://oauth2.googleapis.com/token`;
        const options = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_CALLBACK_URL,
            grant_type: 'authorization_code',
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(options)
        })
        const data = await response.json();
        const url2 = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.access_token}`;
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        const user = await prisma.user.findFirst({
            where: {
                email: data2.email,
            }
        });
        if (!user) {
            const data = {
                email: data2.email,
                username: data2.name,
                password: data2.id,
            }
            const user = await prisma.user.create({
                data,
            });
            const token = jwt.sign({id: user.id}, pair.private, {
                algorithm: "RS256",
                expiresIn: process.env.JWT_EXPIRE,
            });
            const options = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly: false,
            };
            res.status(201).cookie("token", token, options);
        }
        else {
            const token = jwt.sign({id: user.id}, pair.private, {
                algorithm: "RS256",
                expiresIn: process.env.JWT_EXPIRE,
            });
            const options = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly: false,
            };
            res.status(201).cookie("token", token, options);
        }

        res.redirect("http://localhost:3000");

    } catch (e) {
        next(e);
    }
}
