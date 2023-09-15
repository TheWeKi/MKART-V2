const ProductCard = () => {
    return (
        <>
            <div className="card w-72 lg:w-80 bg-base-100 shadow-xl">
                <figure>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
                </figure>
                <div className="card-body">

                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <div className="text-lg font-semibold text-black mx-auto my-auto">
                            199.99
                        </div>
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard