import Filter from "../components/product_list/Filter"
import Pagination from "../components/product_list/Pagination"
import ProductLayout from "../components/product_list/ProductLayout"

const ProductList = () => {
    return (
        <>
            <Filter/>
            <ProductLayout/>
            <Pagination/>
        </>
    )
}

export default ProductList