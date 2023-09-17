const ProductDetail = () => {
    return (
        <>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center '>
                <div className='flex flex-col gap-6'>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="" className='object-cover rounded-xl mx-auto'/>
                </div>
                {/* ABOUT */}
                <div className='flex flex-col gap-4 lg:w-2/4 ml-4 '>
                    <div>
                    <div className="badge badge-outline badge-lg mb-4">Shoes</div>
                        <h1 className='text-4xl font-semibold  mb-2'>Title</h1>
                    </div>
                    <p className='text-gray-700 text-md' >
                         Get Your Smash Right Now!!!
                         Lorem ipsum dolor sit amet consectetur 
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur fuga, eligendi dicta doloremque asperiores deleniti aperiam, neque numquam labore aliquam, molestiae possimus laborum iusto et libero quibusdam architecto similique cupiditate explicabo reprehenderit! Excepturi tempore neque expedita, aliquid quas illum ipsa perferendis non voluptates eaque facilis facere ut id doloremque esse.
                         adipisicing elit. Molestias illum molestiae neque harum distinctio, quos aperiam officiis omnis totam! Odit aliquid voluptas qui veniam tenetur asperiores nam possimus similique velit porro! Alias repudiandae delectus quam quidem eos sit maiores ipsum fuga at. Placeat dolorem odit atque blanditiis voluptatibus delectus modi!
                         Feel Lighter as never before !!!
                    </p>
                    <h6 className='text-3xl  mb-2'>$478</h6>
                    <div className='flex flex-row items-center gap-12'>
                        <div className='flex flex-row items-center'>
                        <button className="btn btn-outline btn-lg text-xl">-</button>
                            <span className='py-4 px-6 rounded-lg text-2xl'>0</span>
                        <button className="btn btn-outline btn-lg text-xl">+</button>  
                        
                        </div>
                        
                    </div>
                    <button className="btn btn-lg mt-4 btn-outline">Add To Cart</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductDetail