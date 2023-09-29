import prisma from "../database/prismaClient.js";
import {dispatchJsonToken} from "../utils/dispatchToken.js";
import Errorhandler from "../utils/errorhandler.js";

export const signUp = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: req.body,
        });
        res
            .status(201)
            .json(user)
    } catch (e) {
        next(e);
    }
}
export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findFirst({where: {email: email}});
        if (!user) {
            return next(new Errorhandler(404,"User Not Found"));
        }
        const isMatch = password === user.password;
        if (!isMatch) {
            return next(new Errorhandler(400,"Invalid Credentials"))
        }

        dispatchJsonToken(user, 201, res);
    } catch (e) {
        next(e);
    }
};