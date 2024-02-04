import express from "express";
import {login, signUp ,reset} from "../controller/authController.js";


const authRouter = express.Router();


authRouter
    .route('/login')
    .post(login);

authRouter
    .route('/signup')
    .post(signUp);

authRouter
    .route('/reset')
    .get(reset);

export default authRouter;