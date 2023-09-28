import prisma from "../database/prismaClient.js";

const addToCart = async (req, res) => {
    try {
        const {prodId, quantity} = req.body;
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: {id: userId},
        });

        const product = await prisma.product.findUnique({
            where: {id: prodId},
        });

        if (!user || !product) {
            return console.log("User or Product Not Found");
        }

        let cart = await prisma.cart.findUnique({
            where: {userId},
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId,
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
        console.log(e);
    }
}

const getCart= async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                userId:req.user.id,
            }
        })

        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId:cart.id,
            }
        })
        res.json(cartItems)
    } catch (e) {
        console.log(e);
    }
}

export {addToCart, getCart}
