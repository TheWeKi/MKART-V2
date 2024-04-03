import CartList from "../components/cart/CartList.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../axios/baseUrl.js";

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
    }, [])
    return (
        <>
            {
                cartItems.length === 0 ?
                    <div className="hero bg-base-100 min-h-[70vh]">
                        <div className="hero-content text-center">
                            <div className="max-w-lg">
                                <h1 className="mb-5 text-5xl">
                                    Cart is empty
                                </h1>
                                <Link to={"/"}>
                                    <button className="btn btn-lg mt-4 btn-outline">Go Shopping</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <section>
                        <div className="min-h-[70vh] bg-base-100 flex flex-col lg:flex-row place-content-evenly px-8">
                            <div className="flex-col max-w-lg w-full mx-auto px-8">
                                <div className="lg:fixed lg:h-[70vh] lg:w-[28vw] lg:overflow-y-scroll">

                                    <CartList cartItems={cartItems} />

                                </div>
                            </div>
                            <div className="flex-col content-center place-items-center max-w-lg w-full mx-auto px-8 py-8">
                                <div>

                                    <Link to={"/checkout"}>
                                        <button className="btn btn-block mt-6 btn-outline btn-neutral">Proceed To COMPLETE</button>
                                    </Link>

                                </div>
                            </div>
                            
                            {/* Order Summary Below */}
                            {/* <div className="flex-col max-w-lg w-full mx-auto px-8 py-8">
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
                                    <h2 className="text-xl font-semibold">{tax + ship + totalPrice}</h2>

                                </div>

                                <div className="mt-8 flex justify-center ">

                                    <Link to={"/checkout"}>
                                        <button className="btn btn-lg mt-4 btn-outline">Checkout</button>
                                    </Link>

                                </div>
                            </div> */}
                        </div>
                    </section>
            }
        </>
    );
};

export default Cart;
