import ProductCard from "./ProductCard"

const ProductLayout = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center p-12">
                <div>
                    <ProductCard/>
                </div>
                <div>
                    <ProductCard/>
                </div>
                <div>
                    <ProductCard/>
                </div>
                <div>
                    <ProductCard/>
                </div>

                <div>
                    <ProductCard/>
                </div>
                <div>
                    <ProductCard/>
                </div>
                <div>
                    <ProductCard/>
                </div>
                <div>
                    <ProductCard/>
                </div>
            </div>
        </>
    )
}

export default ProductLayout