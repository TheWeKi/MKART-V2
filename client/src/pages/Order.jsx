import {useEffect, useState} from "react";
import {baseUrl} from "../axios/baseUrl.js";
import {useNavigate} from "react-router-dom";

const Order = () => {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {

        const res = await baseUrl.get(`/orders/ordersByUser`, {
            headers: {
                Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
            }
        });
        setOrders(res.data);

    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <main>
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
                            <tr key={order.id}>
                                <td>
                                    {order.id}
                                </td>
                                {/* <td>
                                    username
                                </td> */}
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

        </main>
    )
}

export default Order;
