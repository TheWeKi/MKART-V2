import prisma from "../database/prismaClient.js";

const getCartByUserId = async (req, res) => {
    const {userId} = req.params;
    const cart = await prisma.cart.findFirst({
        where: {
            userId,
        }
    });
    res.json(cart);
}


const getCartById = async (req, res) => {
    const {id} = req.params;
    const cart = await prisma.cart.findFirst({
        where: {
            id,
        }
    });
    res.json(cart);
}

const createCart = async (req, res) => {
    const newCart = await prisma.cart.create({
        data: req.body,
    });
    res
        .status(201)
        .json(newCart);
}