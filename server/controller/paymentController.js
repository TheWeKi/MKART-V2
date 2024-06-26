import Stripe from 'stripe';
import axios from "axios";
import fs from "fs";
import { createInvoice } from "../utils/createInvoice.js";
import { uploadPdf } from "../utils/uploadToS3.js";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripeCheckout = async (req, res) => {
    const { products } = req.body;
    const user = req.user;

    const shipping = 49;
    const tax = 0.12;

    const line_items = await Promise.all(products.map(async product => {
        const response = await axios.get(`${process.env.SERVER_URL}/api/v1/products/${product.productId}`);
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: response.data.title,
                    images: [response.data.image],
                },
                unit_amount: Math.round((response.data.price * 100) * (1 + tax)),
            },
            quantity: product.quantity,
        };
    }));

    line_items.push({
        price_data: {
            currency: "inr",
            product_data: {
                name: "Shipping",
            },
            unit_amount: shipping * 100,
        },
        quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: line_items,

        mode: "payment",
        payment_method_types: ["card"],

        // shipping_address_collection: {
        //     allowed_countries: ['IN'],
        // },

        billing_address_collection: 'auto',

        success_url: `${process.env.SERVER_URL}/api/v1/payments/payment-status?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SERVER_URL}/api/v1/payments/payment-status?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.json({ id: session.id });
}

const stripePayment = async (req, res) => {
    const customer = await stripe.checkout.sessions.retrieve(req.query.session_id);

    if (customer.payment_status === "unpaid") {
        return res.redirect(`${process.env.CLIENT_URL}/order-fail`);
    }

    const response = await axios.post(`${process.env.SERVER_URL}/api/v1/orders`, {
        deliveryAddress: req.user.deliveryAddress,
    }, {
        headers: {
            Authorization: `Bearer ${req.cookies.token}`,
        }
    });

    const getOrder = await axios.get(`${process.env.SERVER_URL}/api/v1/orders/${response.data._id}`, {
        headers: {
            Authorization: `Bearer ${req.cookies.token}`,
        }
    });

    await createInvoice(getOrder.data, `${getOrder.data._id}.pdf`);
    const data = fs.readFileSync(`./${getOrder.data._id}.pdf`);
    await uploadPdf(data, getOrder.data._id, req.user._id);
    fs.unlinkSync(`./${getOrder.data._id}.pdf`);

    res.redirect(`${process.env.CLIENT_URL}/order-success`);
}

export { stripeCheckout, stripePayment };
