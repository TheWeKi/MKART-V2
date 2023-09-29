import prisma from "../database/prismaClient.js";
import jwt from "jsonwebtoken";
import Errorhandler from "../utils/errorhandler.js";
import fs from "node:fs";

export const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return next(new Errorhandler(400, "Login Required"));
        }
        const publicKEY = fs.readFileSync('./public.key', 'utf8');
        const decodedData = await jwt.verify(token, publicKEY, {
            algorithms: ["RS256"],
        });

        req.user = await prisma.user.findFirst({
            where:
                {
                    id: decodedData.id
                }
        });
        if (!token) {
            return next(new Errorhandler(400, "Login Required"));
        }
        next();
    } catch (error) {
        next(error);
    }
};


export const isAuthorized = (role) => {

    return (req, res, next) => {
        try {
            if (role.toString() !== (req.user.roleAdmin.toString())) {
                return next(new Errorhandler(400, "Not Authorized"))
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}
