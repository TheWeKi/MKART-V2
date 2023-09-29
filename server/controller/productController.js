import prisma from "../database/prismaClient.js";
import Errorhandler from "../utils/errorhandler.js";

const getProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany();
        if (!products) {
            return next(new Errorhandler(404, "Products Not Founds"))
        }
        res.json(products)
    } catch (e) {
        next(e);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await prisma.product.findFirst({
            where: {
                id,
            }
        })
        if (!product) {
            return next(new Errorhandler(404, "Product Not Founds"))
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
        const newProduct = await prisma.product.create({
            data: data,
        });
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
        await prisma.product.delete({
            where: {
                id,
            }
        })
        res.json({
            message: `Product [${id}] Deleted Successfully`
        })
    } catch (e) {
        next(e);
    }
}

const updateProductById = async (req, res, next) => {
    try {
        const {id} = req.params
        const updatedProduct = await prisma.product.update({
            data: req.data,
            where: {
                id,
            }
        })
        res.json(updatedProduct)
    } catch (e) {
        next(e);
    }
}

export {getProducts, getProductById, addProduct, updateProductById, deleteProductById}