import prisma from "../database/prismaClient.js";
import jwt from "jsonwebtoken";
import Errorhandler from "../utils/errorhandler.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return next(new Errorhandler(400,"Login Required"));
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
                return next(new Errorhandler(400,"Not Authorized"))
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}
