import jwt from "jsonwebtoken";
import fs from "fs";

export const dispatchJsonToken = (user, statusCode, res) => {
    const privateKEY = fs.readFileSync('./private.key', 'utf8');
    const token = jwt.sign({id: user.id}, privateKEY, {
        algorithm: "RS256",
        expiresIn: process.env.JWT_EXPIRE,
    });

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res
        .status(201)
        .cookie("token", token, options)
        .json({
            message: "Successfully Achieved",
            token,
        });
};