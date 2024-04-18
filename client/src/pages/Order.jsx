import { useEffect, useState } from "react";
import { baseUrl } from "../axios/baseUrl.js";
import { Link } from "react-router-dom";

const Order = () => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const res = await baseUrl.get(`/orders/ordersByUser`);
        setOrders(res.data);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <main>
            {
                orders.length === 0 ?
                    (
                        <div className="hero bg-base-100 min-h-[70vh]">
                            <div className="hero-content text-center">
                                <div className="max-w-lg">
                                    <h1 className="mb-5 text-5xl">
                                        No Orders Yet
                                    </h1>
                                    <Link to={"/products"}>
                                        <button className="btn btn-lg mt-4 btn-outline">Go Shopping</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 className="text-xl pl-16 font-bold mt-10 mb-5">Orders</h1>
                            </div>

                            <div className="px-12">
                                <table className="table table-zebra table-lg">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            {/* <th>Username</th> */}
                                            <th>Delivery Address</th>
                                            <th>Total Amount</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>


                                    <tbody>

                                        {
                                            orders.map(order => (
                                                <tr key={order._id}>
                                                    <td>
                                                        {order._id}
                                                    </td>
                                                    
                                                    <td>
                                                        {order.deliveryAddress}
                                                    </td>
                                                    <td>
                                                        {order.totalPrice}
                                                    </td>
                                                    <td>
                                                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                                                    </td>
                                                    <td>
                                                        {order.createdAt.split("T")[0]}
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>


                                </table>
                            </div>
                        </>
                    )
            }

        </main>
    )
}

export default Order;
