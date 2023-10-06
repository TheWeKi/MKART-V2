import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../axios/baseUrl.js";

const ProductDetail = () => {
    const navigate = useNavigate();
    const {productId}= useParams();
    const [product,setProduct] = useState({});
    const [quantity,setQuantity] = useState(1);

    const fetchProduct = async () => {
        const res = await baseUrl.get(`/products/${productId}`)
        setProduct(res.data);
    }
    const handleDecreaseQuantity =()=>{
        if(quantity===1){
            return;
        }
        setQuantity(quantity-1);
    }
    const handleIncreaseQuantity =()=>{
        setQuantity(quantity+1);
    }

    const addToCart = async() => {
        try {
            const data = document.cookie.split("token=")[1];
            const token = data.split(";")[0];
            const res = await axios.post(`http://localhost:8080/api/v1/carts/`,{
                prodId: productId,
                quantity: quantity,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            navigate('/products');
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchProduct();
    },[])
    return (
        <>
            <div className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center px-8">

                {/*image & category badges*/}
                <div className="card max-w-xl w-full bg-base-100">
                    <div className="card-body">
                        {/*image*/}
                        <figure>
                            <img src={product.image} alt=""
                                 className='rounded-lg'/>
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
                        <div className='text-2xl mb-2'>${product.price}</div>

                        {/*quantity*/}
                        <div className='flex flex-row items-center gap-6'>
                            <button onClick={()=>handleDecreaseQuantity()} className="btn btn-outline btn-md text-lg">-</button>
                            <span className="text-xl">{quantity}</span>
                            <button onClick={()=>handleIncreaseQuantity()} className="btn btn-outline btn-md text-lg">+</button>
                        </div>

                        {/*button cart*/}
                        <button onClick={()=>addToCart()} className="btn btn-lg mt-4 btn-outline">Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail