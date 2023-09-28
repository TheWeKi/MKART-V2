import prisma from "../database/prismaClient.js";
import {dispatchJsonToken} from "../utils/dispatchToken.js";

export const signUp = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body,
        });
        res
            .status(201)
            .json(user)
    } catch (e) {
        console.log(e);
    }
}
export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findFirst({where: {email: email}});
        if (!user) {
            return console.log("No user")
        }
        const isMatch = password === user.password;
        if (!isMatch) {
            return console.log("Invalid");
        }

        dispatchJsonToken(user, 201, res);
    } catch (e) {
        console.log(e);
    }
};