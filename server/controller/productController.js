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

export {getProducts, getProductById, addProduct}