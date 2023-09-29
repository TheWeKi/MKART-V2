import prisma from "../database/prismaClient.js";
import Errorhandler from "../utils/errorhandler.js";


const getUsers = async (req, res ,next) => {
    try {
        const users = await prisma.user.findMany();
        if(!users){
            return  next(new Errorhandler(404,"User Not Found"));
        }
        res.json(users);
    } catch (e) {
        next(e);
    }
}


const getUserById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await prisma.user.findFirst({
            where: {
                id,
            }
        })
        if(!user){
            return  next(new Errorhandler(404,"User Not Found"));
        }
        res.json(user)
    } catch (e) {
        next(e);
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const {id} = req.params
        await prisma.user.delete({
            where: {
                id,
            }
        })
        res.json({
            message: `User [${id}] Deleted Successfully`
        })
    } catch (e) {
        next(e);
    }
}

const updateUserById = async (req, res) => {
    try {
        const {id} = req.params
        const updatedUser = await prisma.user.update({
            where: {
                id,
            },
            data: req.body
        })
        res.json(updatedUser)
    } catch (e) {
        console.log(e);
    }
}

export {getUsers, getUserById, updateUserById, deleteUserById}