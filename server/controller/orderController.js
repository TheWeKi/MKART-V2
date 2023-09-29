import prisma from "../database/prismaClient.js";

const getOrders = async (req, res, next) => {
    try {
        const orders = await prisma.order.findFirst({
            where: {
                userId: req.user.id,
            }
        });
        res.json(orders);
    } catch (e) {
        next(e);
    }
}

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {deliveryAddress, totalPrice} = req.body;

        let order = await prisma.order.findFirst({
            where: {
                userId,
            }
        });

        if (!order) {
            order = await prisma.order.create({
                data: {
                    userId,
                }
            });
        }

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

        const cartItemsWithTotalPrice = cartItems.map((cartItem) => {
            const {productId, quantity, product} = cartItem;
            const totalItemPrice = quantity * product.price;

            return {
                prodId: productId,
                quantity,
                totalItemPrice,
            };
        });

        const cartToAddInOrder = order.cart ? order.cart : [];
        cartToAddInOrder.push(...cartItemsWithTotalPrice);

        const orderItem = await prisma.orderItem.create({
            data: {
                deliveryAddress,
                totalPrice,
                orderId: order.id,
                cart: cartToAddInOrder,
            }
        })

        res.status(201).json(orderItem);

    } catch (e) {
        next(e);
    }
}

export {getOrders, createOrder};
