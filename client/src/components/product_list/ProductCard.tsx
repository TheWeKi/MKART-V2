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

const ProductCard= (product:Product) => {
    return (
        <>
            <div>
                <div className="card w-72 lg:w-80 bg-base-100 shadow-xl">
                    <figure>
                        <img src={product.image} alt="Shoes"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Shoes!
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p className="mb-4">{product.description}</p>
                        <div className="card-actions">
                            <div className="flex-1">
                                <p className="text-lg font-semibold">
                                    {`$${product.price}`}
                                </p>
                            </div>
                            <div className="badge badge-outline">{product.category}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard