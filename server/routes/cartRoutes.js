import express from "express";
import {createCart, getCartById} from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter
    .route("/")
    .post(createCart);

cartRouter
    .route("/:id")
    .get(getCartById)

export default cartRouter;
