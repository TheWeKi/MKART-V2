import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    deliveryAddress: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    cart:[{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalItemPrice: {
            type: Number,
            required: true,
        },
    }],
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);