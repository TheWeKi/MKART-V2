import express from "express";

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const paymentRouter = express.Router();
import axios from "axios";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

paymentRouter
    .route("/create-checkout-session")
    .post(isAuthenticated, async (req, res) => {
        const { products, deliveryAddress } = req.body;
        const { token } = req.cookies;

        const line_items = await Promise.all(products.map(async product => {
            const response = await axios.get(`http://localhost:8080/api/v1/products/${product.productId}`);
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

        res.json({ id: session.id });


        await axios.post('http://localhost:8080/api/v1/orders', {
            deliveryAddress: deliveryAddress,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

    });

export default paymentRouter;
