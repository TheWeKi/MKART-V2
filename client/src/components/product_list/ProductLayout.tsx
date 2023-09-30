import {Link} from "react-router-dom";
import ProductCard from "./ProductCard.tsx";
import {getAllProducts} from "../../api/products.ts";

interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
    category: string,
    image: string
    company: string,
    createdAt: Date,
    updatedAt: Date,
    creatorId: string,

}


const ProductLayout = async () => {

    const productList :Product[] = await getAllProducts();
    console.log(productList);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center p-12">

                {
                    productList.map(product => (
                        <div key={product.id}>
                            <Link to='/product-detail'>
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