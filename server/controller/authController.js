import prisma from "../database/prismaClient.js";
import { dispatchJsonToken } from "../utils/dispatchToken.js";
import Errorhandler from "../utils/errorhandler.js";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";

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
    // const user = await prisma.user.findFirst({ where: { email: email } });
    // if (!user) {
    //   return next(new Errorhandler(404, "User Not Found"));
    // }
    const msg = {
      to: 'rp.weki.24@gmail.com', // Change to your recipient
      from: "hungrygrabo@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    const response= await sgMail.send(msg);
    res.status(response[0].statusCode).json({
      message: "Email Sent",
    });
  } catch (e) {
    next(e);
  }
};
