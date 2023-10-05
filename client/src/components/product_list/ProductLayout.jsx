import {Link} from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../axios/baseUrl.js";



const ProductLayout = () => {
    const [products,setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await baseUrl.get('/products')
        setProducts(res.data);
    }
    useEffect(() => {
         fetchProducts();
    },[])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center p-12">

                {
                    products.map(product=> (
                        <div key={product.id}>
                            <Link to={`/product-detail/${product.id}`}>
                                <ProductCard product={product}/>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductLayout