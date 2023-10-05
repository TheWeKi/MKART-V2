import prisma from "../database/prismaClient.js";
import Errorhandler from "../utils/errorhandler.js";

const addToCart = async (req, res, next) => {
    try {
        const {prodId, quantity, price} = req.body;
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: {id: userId},
        });

        const product = await prisma.product.findUnique({
            where: {id: prodId},
        });

        if (!user || !product) {
            return next(new Errorhandler(404, "Resource Not Found"));
        }

        let cart = await prisma.cart.findUnique({
            where: {userId},
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId,
                    price,
                },
            });
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: prodId,
            },
        });

        if (existingCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity: existingCartItem.quantity + quantity,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: prodId,
                    quantity,
                },
            });
        }

        res
            .json({
                message: 'Product added to cart successfully'
            });
    } catch (e) {
        next(e)
    }
}


// { @get Total Product Price With Final Amount }

const getCart = async (req, res, next) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                userId: req.user.id,
            }
        });

        if (!cart) {
            return res.json({
                cartItems: [],
                totalPrice: 0,
            });
        }

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

            totalPrice += totalItemPrice;

            return {
                prodId: productId,
                quantity,
                totalItemPrice,
            };
        });

        res.json({
            cartItems: cartItemsWithTotalPrice,
            totalPrice,
            tax: totalPrice * 0.24,
            shipping: 30,
        });
    } catch (e) {
        next(e);
    }
}

export {addToCart, getCart}
