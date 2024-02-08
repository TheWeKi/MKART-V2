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

authRouter.route('/auth/google').get(passport.authenticate('google'));

authRouter.route('/auth/google/callback').get(
        passport.authenticate('google', {
            failureRedirect: 'http://localhost:3000/login',
            successRedirect: 'http://localhost:3000/'
        })
);


export default authRouter;