import jwt from "jsonwebtoken";
import pair from "./keyPair.js";

export const dispatchJsonToken = (user, statusCode, res) => {

    const token = jwt.sign({id: user.id}, pair.private, {
        algorithm: "RS256",
        expiresIn: process.env.JWT_EXPIRE,
    });

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: false,
    };

    res
        .status(201)
        .cookie("token", token, options)
        .json({
            message: "Successfully Achieved",
            token,
            user: {
                id: user.id,
                email: user.email,
                roleAdmin: user.roleAdmin,
            },
        });
};