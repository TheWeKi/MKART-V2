import express from "express";
import {isAuthenticated, isAuthorized} from "../middleware/isAuthenticated.js";
import {createOrder, getOrders} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter
    .route("/")
    .get(isAuthenticated, isAuthorized(true), getOrders)
    .post(isAuthenticated, isAuthorized(true), createOrder);

export default orderRouter;
