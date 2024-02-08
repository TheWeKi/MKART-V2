import express from "express";
import {login, signUp ,reset, newPassword} from "../controller/authController.js";
import passport from "passport";
import "../utils/google.js";


const authRouter = express.Router();


authRouter
    .route('/login')
    .post(login);

authRouter
    .route('/signup')
    .post(signUp);

authRouter
    .route('/reset')
    .post(reset);

authRouter
    .route('/newPassword')
    .post(newPassword);


export default authRouter;