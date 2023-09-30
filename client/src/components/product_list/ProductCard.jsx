const ProductCard = () => {
    return (
        <>
            <div>
                <div className="card w-72 lg:w-80 bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b03267cc-b6ac-4a7b-b2b3-abb3d9014173/zoom-vomero-5-shoes-KxjTbk.png"
                            alt="Shoes"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Shoes!
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p className="mb-4">This is description</p>
                        <div className="card-actions">
                            <div className="flex-1">
                                <p className="text-lg font-semibold">
                                    {`$${999}`}
                                </p>
                            </div>
                            <div className="badge badge-outline">Shoes</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard