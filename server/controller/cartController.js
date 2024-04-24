import Errorhandler from "../utils/errorhandler.js";
import {User} from "../model/userModel.js";
import {Product} from "../model/productModel.js";
import {Cart} from "../model/cartModel.js";
import {CartItem} from "../model/cartItemModel.js";
/*
const addToCart = async (req, res, next) => {
    try {
        const {productId, quantity} = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        const product = await Product.findById(productId);

        if (!user || !product) {
            return next(new Errorhandler(404, "Resource Not Found"));
        }

        let cart = await Cart.findOne({userId});

        if (!cart) {
            cart = await Cart.create({
                    userId,
                });
        }

        const existingCartItem = await CartItem.findOne({
                cartId: cart.id,
                productId: productId,
            });

        if (existingCartItem) {
            await CartItem.findByIdAndUpdate(existingCartItem.id,{
                    quantity: existingCartItem.quantity + quantity,
                },
                {new: true});
        } else {
            await CartItem.create({
                    cartId: cart._id,
                    productId: productId,
                    quantity,
                },
            );
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
        const cart = await Cart.findOne({userId: req.user._id});

        if (!cart) {
            return res.json({
                cartItems: [],
                totalPrice: 0,
            });
        }

        const cartItems = await CartItem.find({ cartId: cart.id }).populate('productId');

        console.log(cartItems);

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
            tax: totalPrice * 0.12,
            shipping: 30,
        });
    } catch (e) {
        next(e);
    }
}
*/
const addToCart = async (req, res, next) => {
    try {
        const {productId, quantity, size} = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user || !product) {
            return next(new Errorhandler(404, "Resource Not Found"));
        }

        let cart = await Cart.findOne({userId});

        if (!cart) {
            cart = new Cart({
                userId,
            });
            await cart.save();
        }

        const existingCartItem = await CartItem.findOne({
            cartId: cart._id,
            productId: productId,
        });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
        } else {
            const newCartItem = new CartItem({
                cartId: cart._id,
                productId: productId,
                quantity,
                size,
            });
            await newCartItem.save();
        }

        res.json({
            message: 'Product added to cart successfully'
        });
    } catch (e) {
        next(e);
    }
}

const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({
            userId: req.user.id,
        });

        if (!cart) {
            return res.json({
                cartItems: [],
                totalPrice: 0,
            });
        }

        const cartItems = await CartItem.find({
            cartId: cart._id,
        }).populate('productId');

        let totalPrice = 0;

        const cartItemsWithTotalPrice = cartItems.map((cartItem) => {
            const productId = cartItem.productId._id;
            const quantity = cartItem.quantity;

            const product = cartItem.productId;

            const totalItemPrice = quantity * product.price;

            totalPrice += totalItemPrice;

            return {
                productId: productId,
                quantity,
                totalItemPrice,
                size: cartItem.size,
            };
        });

        res.json({
            cartItems: cartItemsWithTotalPrice,
            totalPrice,
            tax: totalPrice * 0.12,
            shipping: 49,
        });
    } catch (e) {
        next(e);
    }
}

const deleteCartItem = async (req, res, next) => {

    try {
        const prodId= req.params.prodId;
        const userId = req.user.id;
        const user = await User.findById(userId);

        const product = await Product.findById(prodId);

        if (!user || !product) {
            return next(new Errorhandler(404, "Resource Not Found"));
        }

        const cart = await Cart.findOne({userId});

        if (!cart) {
            return next(new Errorhandler(404, "Resource Not Found"));
        }

        const existingCartItem = await CartItem.findOne({
                cartId: cart.id,
                productId: prodId,
            });

        if (!existingCartItem) {
            return next(new Errorhandler(404, "Resource Not Found"));
        }

        await CartItem.findByIdAndDelete(existingCartItem.id);

        res.json({
            message: 'Product removed from cart successfully',
        });
    } catch (e) {
        next(e);
    }
}


export {addToCart, getCart, deleteCartItem}
