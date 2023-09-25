import prisma from "../database/prismaClient.js";

const createUser = async (req, res) => {
    const userData = req.body;
    await prisma.user.create(userData);
    res
        .status(201)
        .json({
            success: "true",
            message: "User Created Successfully"
        })
}

const getUsers = async (req, res) => {
    const users = await prisma.user.findMany();

    if (!users) {
    }

    res.json(users);

}


const getUserById = async (req, res) => {
    const {id} = req.params
    const user = await prisma.user.findFirst({
        where: {
            id,
        }
    })
    res.json(user)
}

const deleteUserById = async (req, res) => {
    const {id} = req.params
    await prisma.user.delete({
        where: {
            id,
        }
    })
    res.json({
        message: `User [${id}] Deleted Successfully`
    })
}

const updateUserById = async (req, res) => {
    const {id} = req.params
    const updatedUser = await prisma.user.update({
        where: {
            id,
        },
        data: req.body
    })
    res.json(updatedUser)
}

export {getUsers, getUserById, updateUserById, deleteUserById, createUser}