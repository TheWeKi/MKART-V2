import prisma from "../database/prismaClient.js";


const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (e) {
        console.log(e);
    }
}


const getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const user = await prisma.user.findFirst({
            where: {
                id,
            }
        })
        res.json(user)
    } catch (e) {
        console.log(e);
    }
}

const deleteUserById = async (req, res) => {
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
        console.log(e);
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