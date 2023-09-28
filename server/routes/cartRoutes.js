import express from "express";
import {createCart, getCartById} from "../controller/cartController.js";
import {isAuthenticated, isAuthorized} from "../middleware/isAuthenticated.js";

const cartRouter = express.Router();

cartRouter
    .route("/")
    .post(isAuthenticated, isAuthorized(true), createCart);

cartRouter
    .route("/:id")
    .get(isAuthenticated, isAuthorized(true), getCartById)

export default cartRouter;
