import prisma from "../database/prismaClient.js";

const getProducts = async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products)
}

const getProductById = async (req, res) => {
    const {id} = req.params;
    const product = await prisma.product.findFirst({
        where: {
            id,
        }
    })
    res.json(product)
}

const addProduct = async (req, res) => {
    const product = req.body;
    const newProduct = await prisma.product.create({
        data: product,
    });
    res
        .status(201)
        .json(newProduct)
}

const deleteProductById = async (req, res) => {
    const {id} = req.params;
    await prisma.product.delete({
        where: {
            id,
        }
    })
    res.json({
        message: `Product [${id}] Deleted Successfully`
    })
}

const updateProductById = async (req, res) => {
    const {id} = req.params
    const updatedProduct = await prisma.product.update({
        data: req.data,
        where: {
            id,
        }
    })
    res.json(updatedProduct)
}

export {getProducts, getProductById, addProduct, updateProductById, deleteProductById}