import {Link} from "react-router-dom";
import ProductCard from "./ProductCard.tsx";

const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ProductLayout = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center p-12">

                {
                    productIds.map(id => (
                        <div key={id}>
                            <Link to='/product-detail'>
                                <ProductCard/>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductLayout