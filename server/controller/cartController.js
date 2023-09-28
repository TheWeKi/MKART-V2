import prisma from "../database/prismaClient.js";

const createCart = async (req, res) => {

    const data = {...req.body, userId: req.user.id}

    const cart = await prisma.cart.create({
        data,
    });
    res
        .status(201)
        .json(cart);
}

const getCartById = async (req, res) => {
    const {id} = req.params;
    const cart = await prisma.cart.findFirst({
        where: {
            id,
        }
    })
    res.json(cart)
}

export {createCart, getCartById}
