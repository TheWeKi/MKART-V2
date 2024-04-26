const ProductCard = ({ product }) => {
    return (
        <>
            <div>
                <div className="card w-72 lg:w-80 bg-base-100 shadow-xl">
                    <figure>
                        <img className="max-h-60 w-full object-cover"
                            src={product.image}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {product.title}
                        </h2>
                        {/*<p className="mb-4">{product.description.split('?')[0]}</p>*/}
                        <div className="flex justify-between">
                            <div className="badge">{product.category}</div>
                            <div className="badge">{product.company}</div>
                        </div>
                        <div className="card-actions">
                            <div className="flex-1">
                                <p className="text-lg font-semibold">
                                    {`₹${product.price}`}
                                </p>
                                <span className="text-sm text-gray-400">(excl. of taxes)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard;
