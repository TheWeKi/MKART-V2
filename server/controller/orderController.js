import { Order } from "../model/orderModel.js";
import { Cart } from "../model/cartModel.js";
import { CartItem } from "../model/cartItemModel.js";

const getOrders = async (req, res, next) => {
    try {

        const allOrders = await Order.find({});
        res.json(allOrders);
    } catch (e) {
        next(e);
    }
}

const getOrdersByUser = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json(orders)
    } catch (error) {
        next(error);
    }
}
const getOrderItemById = async (req, res, next) => {
    try {
        const { id } = req.body;
        const orderItem = await Order.findById(id);
        res.json(orderItem)
    } catch (error) {
        next(error);
    }
}

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { deliveryAddress } = req.body;

        const cart = await Cart.findOne({ userId });

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
            };
        });

        const cartToAddInOrder = [];
        cartToAddInOrder.push(...cartItemsWithTotalPrice);

        const orderItem = await Order.create({
            deliveryAddress: deliveryAddress,
            totalPrice: totalPrice + 30 + totalPrice * 0.12,
            cart: cartToAddInOrder,
            userId: req.user.id,
        });

        res.status(201).json(orderItem);

        await CartItem.deleteMany({ cartId: cart._id });

    } catch (e) {
        next(e);
    }
}

export { getOrders, createOrder, getOrdersByUser, getOrderItemById };
