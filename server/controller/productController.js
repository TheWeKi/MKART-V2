import Errorhandler from '../utils/errorhandler.js';
import {Product} from "../model/productModel.js";
import {uploadFile} from "../utils/uploadToS3.js";

const getProducts = async (req, res, next) => {
    const { companies, categories, minPrice, maxPrice } = req.query;

    // Convert the comma-separated strings into arrays
    const companyArray = companies ? companies.split(',') : [];
    const categoryArray = categories ? categories.split(',') : [];

    // Create a filter object based on the query parameters
    let filter = {};

    if (companyArray.length > 0) {
        filter.company = { $in: companyArray };
    }

    if (categoryArray.length > 0) {
        filter.category = { $in: categoryArray };
    }

    if (minPrice) {
        filter.price = { $gte: Number(minPrice) };
    }

    if (maxPrice) {
        if (filter.price) {
            filter.price.$lte = Number(maxPrice);
        } else {
            filter.price = { $lte: Number(maxPrice) };
        }
    }
    try {
        const products = await Product.find(filter);
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
        const {title, category, company, description, price} = req.body;
        const creator = req.user._id;
        const image = req.file;

        const imageUrl = await uploadFile(image);

        const data = {
            title: title,
            image: imageUrl,
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
        const {id , title, category, company, description, price} = req.body;
        const image = req.file;
        if(!image) {
            const data = {
                title: title,
                price: price,
                category: category,
                description: description,
                company: company
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true});
            return res.json(updatedProduct)
        }

        const imageUrl = await uploadFile(image);
        const data = {
            title: title,
            image: imageUrl,
            price: price,
            category: category,
            description: description,
            company: company
        }


        const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true});
        res.json(updatedProduct);
    } catch (e) {
        next(e);
    }
}

export {getProducts, getProductById, addProduct, updateProductById, deleteProductById}