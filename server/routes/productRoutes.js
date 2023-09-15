import {Router} from "express";
import {addProduct, getProductById, getProducts} from "../controller/productController.js";

const productRouter = Router();

productRouter
    .route('/')
    .get(getProducts)
    .post(addProduct);

productRouter
    .route('/:id')
    .get(getProductById);

export default productRouter;