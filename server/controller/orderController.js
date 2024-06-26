import { Order } from "../model/orderModel.js";
import { Cart } from "../model/cartModel.js";
import { CartItem } from "../model/cartItemModel.js";
import { User } from "../model/userModel.js";

const getOrders = async (req, res, next) => {
    try {
        const allOrders = await Order.find({}).sort({ createdAt: -1 });
        res.json(allOrders);
    } catch (e) {
        next(e);
    }
}

const getOrdersByUser = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(orders)
    } catch (error) {
        next(error);
    }
}

const changeOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        order.isDelivered = !order.isDelivered;
        await order.save();

        res.json(order);
    } catch (error) {
        next(error);
    }
}

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const orderItem = await Order.findById(id).populate('cart.productId');

        res.json(orderItem)
    } catch (error) {
        next(error);
    }
}
const getOrderByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json([]);
        }

        const userId = user._id;
        const orderItem = await Order.find({ userId }).populate('cart.productId');

        res.json(orderItem)
    } catch (error) {
        next(error);
    }
}
const createOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
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
                totalItemPrice: totalItemPrice.toFixed(2),
                size: cartItem.size,
            };
        });

        const cartToAddInOrder = [];
        cartToAddInOrder.push(...cartItemsWithTotalPrice);

        const orderItem = await Order.create({
            deliveryAddress: deliveryAddress,
            totalPrice: ((totalPrice * 1.12) + 49).toFixed(2),
            cart: cartToAddInOrder,
            userId: req.user._id,
        });

        res.status(201).json(orderItem);

        await CartItem.deleteMany({ cartId: cart._id });

    } catch (e) {
        next(e);
    }
}

export { getOrders, createOrder, getOrdersByUser, changeOrderStatus, getOrderById, getOrderByEmail };
