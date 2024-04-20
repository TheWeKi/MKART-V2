import {useParams} from "react-router-dom";
import {baseUrl} from "../axios/baseUrl.js";
import {useEffect, useState} from "react";

const OrderDetail = () => {
    const {id} = useParams();

    const [order, setOrder] = useState({});
    const fetchOrder = async () => {
        const response = await baseUrl.get(`/orders/${id}`);
        setOrder(response.data);
        console.log(response.data)
    }


    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>
            <div className="p-10 max-w-4xl mx-auto bg-white rounded-xl shadow-md flex flex-col items-start space-y-4">
                <div>
                    <h1 className="text-3xl font-semibold">Order ID: {order._id}</h1>
                    <h2 className="mt-2 text-gray-500 text-xl">Total Price: {order.totalPrice}</h2>
                </div>
                {order.cart && order.cart.map(item => (
                    <div className="mt-4 bg-blue-100 p-4 rounded-md flex items-start space-x-4">
                        <img src={item.productId.image} alt={item.productId.title} className="h-32 w-32 object-cover"/>
                        <div>
                            <h2 className="text-xl font-semibold">Item Name: {item.productId.title}</h2>
                            <p className="text-md text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-md text-gray-500">Price: {item.productId.price} * {item.quantity} = {item.totalItemPrice}</p>
                            <p className="mt-2 text-md text-gray-500">Description: {item.productId.description}</p>
                        </div>
                    </div>
                ))}
                <h2 className="mt-2 text-gray-500 text-xl">Delivery Address: {order.deliveryAddress}</h2>
            </div>
        </>
    )
}

export {OrderDetail};