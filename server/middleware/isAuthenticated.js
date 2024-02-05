import prisma from "../database/prismaClient.js";
import jwt from "jsonwebtoken";
import Errorhandler from "../utils/errorhandler.js";
import pair from "../utils/keyPair.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
        if (!token) {
            return next(new Errorhandler(400, "Login Required"));
        }
        const decodedData = await jwt.verify(token, pair.public, {
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
