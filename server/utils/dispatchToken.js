import jwt from "jsonwebtoken";

export const dispatchJsonToken = (user, statusCode, res) => {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE
        })
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        }
        res
            .status(201)
            .cookie("token", token, options)
            .json({
                message: "Successfully Achieved"
            });
    }