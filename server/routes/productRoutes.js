import {Router} from "express";
import multer from "multer";
import {
    addProduct,
    deleteProductById,
    getProductById,
    getProducts,
    updateProductById
} from "../controller/productController.js";
import {isAuthenticated, isAuthorized} from "../middleware/isAuthenticated.js";

const upload = multer({storage: multer.memoryStorage()});

const productRouter = Router();

productRouter
    .route('/')
    .get(getProducts)
    .post(isAuthenticated, isAuthorized(true), upload.single("image"), addProduct);

productRouter
    .route('/:id')
    .get(getProductById)
    .put(isAuthenticated, isAuthorized(true), updateProductById)
    .delete(isAuthenticated, isAuthorized(true), deleteProductById);

export default productRouter;
