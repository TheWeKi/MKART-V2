import {Router} from "express";
import {
    addProduct,
    deleteProductById,
    getProductById,
    getProducts,
    updateProductById
} from "../controller/productController.js";
import {isAuthenticated, isAuthorized} from "../middleware/isAuthenticated.js";

const productRouter = Router();

productRouter
    .route('/')
    .get(getProducts)
    .post(isAuthenticated, isAuthorized(true), addProduct);

productRouter
    .route('/:id')
    .get(getProductById)
    .put(isAuthenticated, isAuthorized(true), updateProductById)
    .delete(isAuthenticated, isAuthorized(true), deleteProductById);

export default productRouter;
