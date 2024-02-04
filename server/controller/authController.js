import prisma from "../database/prismaClient.js";
import { dispatchJsonToken } from "../utils/dispatchToken.js";
import Errorhandler from "../utils/errorhandler.js";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";

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
