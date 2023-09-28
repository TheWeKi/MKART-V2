import express from "express";
import {addToCart, getCart} from "../controller/cartController.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js";

const cartRouter = express.Router();

cartRouter
    .route("/")
    .post(isAuthenticated, addToCart);

cartRouter
    .route("/")
    .get(isAuthenticated, getCart);

export default cartRouter;
