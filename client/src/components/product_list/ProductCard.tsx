const ProductCard = () => {
    return (
        <>
            <div>
                <div className="card w-72 lg:w-80 bg-base-100 shadow-xl">
                    <figure>
                        <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Shoes!
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p className="mb-4">If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions">
                            <div className="flex-1">
                                <p className="text-lg font-semibold">
                                    {`$${999}`}
                                </p>
                            </div>
                            <div className="badge badge-outline">Category</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard