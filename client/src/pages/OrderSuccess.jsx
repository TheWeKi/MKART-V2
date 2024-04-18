import {Link} from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="flex h-screen flex-col bg-white">
            <div className="flex flex-1 items-center justify-center">
                <img
                    src="https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-1486.jpg?w=740&t=st=1713428109~exp=1713428709~hmac=a43825669c496b327128293947056f31420e7ec78ba853ce559ce8f9fe08d082"
                    alt=""
                    className="h-[50vh] w-[50vh] object-fill"
                />
            </div>
                <div className="flex flex-1 items-center justify-center">

                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Your Order is Successfully Placed
                        </h1>

                        <p className="mt-4 text-gray-500">
                            An Email is sent to you with the order details. Thank you for shopping with us.
                        </p>

                        <Link
                            to="/orders"
                            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                        >
                            Go to Orders
                        </Link>
                    </div>
                </div>
            </div>
            );
            }

            export default OrderSuccess;