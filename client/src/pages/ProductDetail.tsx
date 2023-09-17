const ProductDetail = () => {
    return (
        <>
            <div className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center px-8">

                {/*image & category badges*/}
                <div className="card max-w-xl w-full bg-base-100">
                    <div className="card-body">
                        {/*image*/}
                        <figure>
                            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt=""
                                 className='rounded-lg'/>
                        </figure>

                        {/*category*/}
                        <div className="flex flex-row gap-4 mt-4">
                            <div className="badge badge-outline badge-lg">Shoes</div>
                            <div className="badge badge-outline badge-lg">Adidas</div>
                        </div>
                    </div>
                </div>

                {/*details*/}
                <div className="card max-w-xl w-full bg-base-100">
                    <div className="card-body">

                        <div className="mb-4">
                            {/*title*/}
                            <h1 className='text-4xl mb-2'>Title</h1>

                            {/*description*/}
                            <p>
                                Get Your Smash Right Now!!!
                                Feel Lighter as never before !!!
                            </p>
                        </div>

                        {/*price*/}
                        <div className='text-2xl mb-2'>$478</div>

                        {/*quantity*/}
                        <div className='flex flex-row items-center gap-6'>
                            <button className="btn btn-outline btn-md text-lg">-</button>
                            <span className="text-xl">0</span>
                            <button className="btn btn-outline btn-md text-lg">+</button>
                        </div>

                        {/*button cart*/}
                        <button className="btn btn-lg mt-4 btn-outline">Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail