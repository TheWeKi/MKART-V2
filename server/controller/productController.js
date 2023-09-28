import prisma from "../database/prismaClient.js";

const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products)
    } catch (e) {
        console.log(e);
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await prisma.product.findFirst({
            where: {
                id,
            }
        })
        res.json(product)
    } catch (e) {
        console.log(e);
    }
}

const addProduct = async (req, res) => {
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
        console.log(e);
    }
}

const deleteProductById = async (req, res) => {
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
        console.log(e);
    }
}

const updateProductById = async (req, res) => {
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
        console.log(e);
    }
}

export {getProducts, getProductById, addProduct, updateProductById, deleteProductById}