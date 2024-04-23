import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../axios/baseUrl.js";
import { useEffect, useState } from "react";
import Divider from "../components/ui/Divider.jsx"

const OrderDetail = () => {
    const { id } = useParams();

    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});

    const fetchOrder = async () => {
        const orderResponse = await baseUrl.get(`/orders/${id}`);
        setOrder(orderResponse.data);

        const userResponse = await baseUrl.get(`/users/${orderResponse.data.userId}`);
        setUser(userResponse.data);
    }

    const downloadInvoice = async (id) => {
        //call api to download invoice
        console.log("Downloading invoice for order id: ", id);
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>
            <div className="p-10 max-w-4xl mx-auto bg-white rounded-xl shadow-md flex flex-col space-y-4">
                <div>
                    <h1 className="text-2xl font-semibold">Order ID | {order._id}</h1>
                    <h2 className="mt-2 text-gray-500 text-lg">Order Amount: ₹{order.totalPrice}</h2>
                    <h2 className="mt-2 text-gray-500 text-lg">Order Status: {order.isDelivered ? "Delivered" : "Not Delivered"}</h2>
                    <h2 className="mt-2 text-gray-500 text-lg">Date: {new Date(order.createdAt).toLocaleString()}</h2>
                </div>
                <div>
                    <button onClick={() => downloadInvoice(order._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Download Invoice</button>
                </div>
                <Divider />
                <div className="grid grid-cols-2 justify-items-center">
                    {order.cart && order.cart.map(item => (

                        <Link to={`/product-detail/${item.productId._id}`} key={item._id}>
                            <div className="mt-2 bg-gray-50 border p-4 rounded-md flex items-start space-x-4">
                                <img src={item.productId.image} alt={item.productId.title} className="h-32 w-32 object-cover" />
                                <div>
                                    <h2 className="text-xl font-semibold">{item.productId.title}</h2>
                                    <p className="text-md text-gray-500">Quantity: {item.quantity}</p>
                                    <p className="text-md text-gray-500">Price: ₹{item.productId.price}</p>
                                    <p className="text-md text-gray-500">Size: {item.size}UK</p>
                                    <p className="text-md text-gray-500">Total Item Price: ₹{item.totalItemPrice}</p>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
                <Divider />
                <div>
                    <h2 className="text-gray-500 text-lg font-semibold">Ordered By: {user.email}</h2>

                    <h2 className="mt-4 text-gray-700 text-xl font-semibold">Delivery Address</h2>
                    <h2 className="mt-4 text-gray-600 text-[1em]">{order.deliveryAddress}</h2>
                </div>
            </div>
        </>
    )
}

export { OrderDetail };