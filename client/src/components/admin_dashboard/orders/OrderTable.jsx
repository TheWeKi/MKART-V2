import {useEffect, useState} from "react";
import {baseUrl} from "../../../axios/baseUrl.js";

const OrderTable = () => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const data = document.cookie.split("token=")[1];
        const token = data.split(";")[0];
        const res = await baseUrl.get(`/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        setOrders(res.data);

    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <main>

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
                        <th></th>
                        <th></th>
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
                                    <button className="btn btn-outline btn-primary btn-sm">Modify</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline btn-error btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>


                </table>
            </div>

            {/* <Pagination/> */}

        </main>
    )
}

export default OrderTable;
