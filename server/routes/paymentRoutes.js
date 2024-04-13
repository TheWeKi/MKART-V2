import express from "express";

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const paymentRouter = express.Router();
import axios from "axios";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import jwt from "jsonwebtoken";
import pair from "../utils/keyPair.js";

paymentRouter
    .route("/create-checkout-session")
    .post(isAuthenticated, async (req, res) => {
        const { products, deliveryAddress } = req.body;
        const user = req.user;

        const line_items = await Promise.all(products.map(async product => {
            const response = await axios.get(`http://localhost:8080/api/v1/products/${product.prodId}`);
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: response.data.title,
                        images: [response.data.image],
                    },
                    unit_amount: response.data.price * 100,
                },
                quantity: product.quantity,
            };
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/orders`,
            cancel_url: `${process.env.CLIENT_URL}/`,
        });

        const token = jwt.sign({ id: user.id }, pair.private, {
            algorithm: "RS256",
            expiresIn: process.env.JWT_EXPIRE,
        });

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: false,
        };

        res
            .status(200)
            .cookie("token", token, options)
            .json({
                message: "Successfully Achieved",
                token,
                id: session.id
            });


        await axios.post('http://localhost:8080/api/v1/orders', {
            deliveryAddress: deliveryAddress,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

    });

export default paymentRouter;
