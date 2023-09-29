import prisma from "../database/prismaClient.js";

const getOrders = async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({});
        res.json(orders);
    } catch (e) {
        next(e);
    }
}

const createOrder = async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {cartId, deliveryAddress, totalPrice} = req.body;
        const data = {
            deliveryAddress,
            totalPrice,
            cartId,
            userId,
        };
        const order = await prisma.order.create({
            data,
        });

        res.status(201).json(order);

    } catch (e) {
        next(e);
    }
}

export {getOrders, createOrder};
