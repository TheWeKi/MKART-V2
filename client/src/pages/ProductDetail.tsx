const ProductDetail = () => {
    return (
        <>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center '>
                <div className='flex flex-col gap-6'>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="" className='w-3/4 h-3/4 md:w-3/4 md:h-3/4 lg:w-full lg:h-full  aspect-square object-contain rounded-xl mx-auto'/>
                </div>
                {/* ABOUT */}
                <div className='flex flex-col gap-4 lg:w-2/4 ml-4 '>
                    <div>
                        <span className=' text-black-600 font-semibold'>Category</span>
                        <h1 className='text-3xl font-bold'>Title</h1>
                    </div>
                    <p className='text-gray-700 ' >
                        DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
                        DescriptionDescriptionDescriptionDescription
                        DescriptionDescriptionDescriptionDescriptionDescription
                        DescriptionDescriptionDescription
                        DescriptionDescriptionDescription
                        DescriptionDescription
                        DescriptionDescription
                        DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
                    </p>
                    <h6 className='text-2xl font-semibold'>Price</h6>
                    <div className='flex flex-row items-center gap-12'>
                        <div className='flex flex-row items-center'>
                        <button className="btn btn-outline">-</button>
                            <span className='py-4 px-6 rounded-lg'>0</span>
                            <button className="btn btn-outline">+</button>
                        </div>
                        <button className="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductDetail