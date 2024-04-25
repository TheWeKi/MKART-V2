import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../axios/baseUrl.js";
import Divider from "../components/ui/Divider.jsx";

const ProductDetail = () => {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("6");

    const sizes = ["6", "7", "8", "9", "10", "11"];

    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    const fetchProduct = async () => {
        const res = await baseUrl.get(`/products/${productId}`);
        setProduct(res.data);
    }
    const handleDecreaseQuantity = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1);
    }
    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const addToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            await baseUrl.post(`/carts`, {
                productId: productId,
                quantity: quantity,
                size: size
            })

            navigate('/products');
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            <div className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center px-8">

                {/*image & category badges*/}
                <div className="card max-w-xl w-full bg-base-100">
                    <div className="card-body">
                        {/*image*/}
                        <figure>
                            <img src={product.image} alt="" className='rounded-lg' />
                        </figure>

                        {/*category*/}
                        <div className="flex flex-row gap-4 mt-4">
                            <div className="badge badge-outline badge-lg">{product.category}</div>
                            <div className="badge badge-outline badge-lg">{product.company}</div>
                        </div>
                    </div>
                </div>

                {/*details*/}
                <div className="card max-w-xl w-full bg-base-100">
                    <div className="card-body">

                        <div className="mb-4">
                            {/*title*/}
                            <h1 className='text-4xl mb-2'>{product.title}</h1>

                            {/*description*/}
                            <p>
                                {product.description}
                            </p>
                        </div>

                        {/*price*/}
                        <div className='text-2xl mb-2'>₹{product.price}</div>

                        <Divider />

                        <div className="text-lg">Quauntity</div>

                        {/*quantity*/}
                        <div className='flex flex-row items-center gap-6'>
                            <button onClick={() => handleDecreaseQuantity()}
                                className="btn btn-outline btn-md text-lg">-
                            </button>
                            <span className="text-xl">{quantity}</span>
                            <button onClick={() => handleIncreaseQuantity()}
                                className="btn btn-outline btn-md text-lg">+
                            </button>
                        </div>

                        <Divider />

                        <div className="text-lg">Size</div>

                        {/* size */}
                        <div className='flex flex-row items-center gap-3'>
                            {
                                sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`btn btn-outline btn-sm text-sm ${s === size && 'bg-blue-500 text-white'}`}
                                    >
                                        {`${s}UK`}
                                    </button>
                                ))
                            }
                        </div>

                        <Divider />

                        {/*button cart*/}
                        <button onClick={() => addToCart()} className="btn btn-lg mt-4 btn-outline">Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;
