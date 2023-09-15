import { productModel } from "../models/productModel.js";
import { v4 as uuidv4 } from 'uuid';
export const getProducts = async (req,res,next) => {

    res
        .status(200)
        .json({
        success:"true",
        products:productModel
    })

}

export const getProduct = async (req,res,next) => {
    
    const {productId}=req.params;

    const product = productModel.find(p=> p.id.toString()===productId.toString());

    res
        .status(200)
        .json({
        success:"true",
        product:product
    })

}

export const addProduct = async (req,res,next) => {
    
    const {name,description,image,price}=req.body;

    const product ={
        id : uuidv4(),
        name : name,
        description : description,
        image : image,
        price :price
    }

    productModel.push(product);

    res
        .status(200)
        .json({
        success:"true"
    })

}

