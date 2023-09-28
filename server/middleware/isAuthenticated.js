import prisma from "../database/prismaClient.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return console.log("No Token")
        }
        const decodedData = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = await prisma.user.findFirst({
            where:
                {
                    id: decodedData.id
                }
        });

        next();
    } catch (error) {
        next(error);
    }
};


export const isAuthorized = (role) => {

    return (req, res, next) => {
        try {
            if (role.toString() !== (req.user.roleAdmin.toString())) {
                return console.log("Not Authorized")
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}
