import prisma from "../database/prismaClient.js";
import {dispatchJsonToken} from "../utils/dispatchToken.js";
import Errorhandler from "../utils/errorhandler.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
    try {
        const {email} = req.body;
        const {username}=req.body;
        const {password}=req.body;
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
            }
        }
        );
        if (existingUser) {
            return next(new Errorhandler(400, "User Already Exists"));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const data = {
            email: email,
            username:username,
            password: hashedPassword,
        }
        const user = await prisma.user.create({
            data: data,
        });

        dispatchJsonToken(user, 201, res);


    } catch (e) {
        next(e);
    }
}
export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findFirst({where: {email: email}});
        if (!user) {
            return next(new Errorhandler(404, "User Not Found"));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new Errorhandler(400, "Invalid Credentials"))
        }

        dispatchJsonToken(user, 201, res);
    } catch (e) {
        next(e);
    }
};