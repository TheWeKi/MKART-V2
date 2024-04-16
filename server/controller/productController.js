import Errorhandler from '../utils/errorhandler.js';
import {Product} from "../model/productModel.js";

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        if (!products) {
            return next(new Errorhandler(404, "Products Not Found"))
        }
        res.json(products)
    } catch (e) {
        next(e);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return next(new Errorhandler(404, "Product Not Found"))
        }
        res.json(product)
    } catch (e) {
        next(e);
    }
}

const addProduct = async (req, res, next) => {
    try {
        const {title, category, company, image, description, price} = req.body;
        const creator = req.user.id;
        const data = {
            title: title,
            image: image,
            price: price,
            category: category,
            description: description,
            company: company,
            creatorId: creator
        }
        const newProduct = new Product(data);
        await newProduct.save();
        res
            .status(201)
            .json(newProduct)
    } catch (e) {
        next(e);
    }
}

const deleteProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.json({
            message: `Product [${id}] Deleted Successfully`
        })
    } catch (e) {
        next(e);
    }
}

const updateProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedProduct)
    } catch (e) {
        next(e);
    }
}

export {getProducts, getProductById, addProduct, updateProductById, deleteProductById}