import prisma from "../database/prismaClient.js";

const getOrders = async (req, res, next) => {
    try {

        const allOrders = await prisma.order.findMany({});
        res.json(allOrders);
    } catch (e) {
        next(e);
    }
}

const getOrdersByUser = async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: req.user.id,
            }
        });
        res.json(orders)
    } catch (error) {
        next(error);
    }
}
const getOrderItemById = async (req, res, next) => {
    try {
        const {id} = req.body;
        const orderItem = await prisma.order.findFirst({
            where: {
                id: id,
            }
        });
        res.json(orderItem)
    } catch (error) {
        next(error);
    }
}

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {deliveryAddress} = req.body;

        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            }
        });

        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: cart.id,
            },
            include: {
                product: true,
            }
        });
        let totalPrice = 0;
        const cartItemsWithTotalPrice = cartItems.map((cartItem) => {
            const {productId, quantity, product} = cartItem;
            const totalItemPrice = quantity * product.price;
            totalPrice = totalItemPrice + totalPrice;
            return {
                prodId: productId,
                quantity,
                totalItemPrice,
            };
        });

        const cartToAddInOrder = [];
        cartToAddInOrder.push(...cartItemsWithTotalPrice);

        const orderItem = await prisma.order.create({
            data: {
                deliveryAddress: deliveryAddress,
                totalPrice: totalPrice,
                cart: cartToAddInOrder,
                userId: req.user.id,
            }
        });

        res.status(201).json(orderItem);

        await prisma.cartItem.deleteMany({where: {cartId: cart.id}});

    } catch (e) {
        next(e);
    }
}

export {getOrders, createOrder, getOrdersByUser , getOrderItemById};
