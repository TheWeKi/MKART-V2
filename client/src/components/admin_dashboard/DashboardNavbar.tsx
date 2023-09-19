import {useState} from "react";
import Divider from "../ui/Divider";
import {Link} from "react-router-dom";

const DashboardNavbar = () => {

    const [productMenu, setProductMenu] = useState(true);

    return (
        <>
            <div className="flex justify-evenly bg-base-100 items-center max-h-[1vh]">
                <div>
                    <Link to={"/admin-dashboard/products"}>
                        <button className="link link-hover text-lg font-semibold"
                            onClick={() => setProductMenu(true)}
                        >
                            Products
                        </button>
                    </Link>
                </div>
                <Link to={"/admin-dashboard/users"}>
                    <div>
                        <button className="link link-hover text-lg font-semibold"
                            onClick={() => setProductMenu(false)}
                        >
                            Users
                        </button>
                    </div>
                </Link>
                <Link to={"/admin-dashboard/orders"}>
                    <div>
                        <button className="link link-hover text-lg font-semibold"
                            onClick={() => setProductMenu(false)}
                        >
                            Orders
                        </button>
                    </div>
                </Link>
            </div>

            <Divider />

            <div className="flex justify-between bg-base-100 items-center max-h-[1vh] px-[8rem]">
                <div className="flex-1">
                    {
                        productMenu
                        &&
                        <Link to={"/admin-dashboard/products/create-product"}>
                            <button className="btn btn-outline btn-sm">
                                Create New Product
                            </button>
                        </Link>
                    }
                </div>
                <div className="flex gap-4">
                    <input type="text" placeholder={"Search By ID"}
                        className="input input-bordered border-base-600 w-[24rem]" />
                    <button className="btn btn-ghost btn-circle btn-outline border-base-300">
                        <svg className="w-8 h-8 fill-current" fill="none" stroke="currentColor" strokeWidth={2}
                            viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                    </button>
                </div>
            </div>

            <Divider />
        </>
    );
};

export default DashboardNavbar;