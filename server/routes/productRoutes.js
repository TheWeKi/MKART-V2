import express from "express";
import {getProducts,getProduct, addProduct} from "../controller/productController.js"
const router = express.Router();

router
    .route('/')
    .get(getProducts);

router
    .route('/:productId')
    .get(getProduct);

router
    .route('/new')
    .post(addProduct);

export default router;

