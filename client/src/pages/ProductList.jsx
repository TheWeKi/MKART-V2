import Filter from "../components/product_list/Filter.jsx"
import Pagination from "../components/product_list/Pagination.jsx"
import ProductLayout from "../components/product_list/ProductLayout.jsx"

const ProductList = () => {
    return (
        <>
            <Filter/>
            <ProductLayout/>
            {/* <Pagination/> */}
        </>
    )
}

export default ProductList