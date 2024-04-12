import express from "express";
import {isAuthenticated, isAuthorized} from "../middleware/isAuthenticated.js";
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const paymentRouter = express.Router();
import axios from "axios";

paymentRouter
    .route("/create-checkout-session")
    .post(async (req, res) => {
        const {products} = req.body;
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

        console.log(`This is line_items`, line_items);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items : line_items,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/`,
            cancel_url: `${process.env.CLIENT_URL}/`,
        });
        res.json({id: session.id});
    });

export default paymentRouter;
