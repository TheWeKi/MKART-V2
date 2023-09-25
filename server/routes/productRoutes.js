import {Router} from "express";
import {
    addProduct,
    deleteProductById,
    getProductById,
    getProducts,
    updateProductById
} from "../controller/productController.js";

const productRouter = Router();

productRouter
    .route('/')
    .get(getProducts)
    .post(addProduct);

productRouter
    .route('/:id')
    .get(getProductById)
    .put(updateProductById)
    .delete(deleteProductById);

export default productRouter;