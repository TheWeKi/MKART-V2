import CartList from "../components/cart/CartList.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {baseUrl} from "../axios/baseUrl.js";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [tax, setTax] = useState(0);
    const [ship, setShip] = useState(0);

    const fetchCartItems = async () => {
        try {
            const data = document.cookie.split("token=")[1];
            const token = data.split(";")[0];
            const res = await baseUrl.get(`/carts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(res.data)
            setCartItems(res.data.cartItems);
            setTotalPrice(res.data.totalPrice);
            setTax(res.data.tax);
            setShip(res.data.shipping);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCartItems();
    },[])
    return (
        <>
            <section>
                <div className="min-h-[70vh] bg-base-100 flex flex-col lg:flex-row place-content-evenly px-8">
                    <div className="flex-col max-w-lg w-full mx-auto px-8">
                        <div className="lg:fixed lg:h-[70vh] lg:w-[28vw] lg:overflow-y-scroll">

                            <CartList cartItems={cartItems}/>

                        </div>
                    </div>

                    <div className="flex-col max-w-lg w-full mx-auto px-8 py-8">
                        <header className="text-center">
                            <h1 className='text-4xl mb-2'>Order Summary</h1>
                        </header>

                        <div className="mt-8 flex justify-between border-t border-gray-100 pt-8">

                            <div className="text-lg">SubTotal</div>
                            <div className="text-lg">${totalPrice}</div>

                        </div>
                        <div className="mt-8 flex justify-between ">

                            <div className="text-lg">Shipping</div>
                            <div className="text-lg">${ship}</div>

                        </div>
                        <div className="mt-8 flex justify-between ">

                            <div className="text-lg">Tax</div>
                            <div className="text-lg">${tax}</div>

                        </div>

                        <div className="mt-8 flex justify-between ">

                            <h2 className="text-xl font-semibold">Total</h2>
                            <h2 className="text-xl font-semibold">{tax + ship +totalPrice}</h2>

                        </div>

                        <div className="mt-8 flex justify-center ">

                            <Link to={"/checkout"}>
                                <button className="btn btn-lg mt-4 btn-outline">Checkout</button>
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
