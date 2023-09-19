import UserTable from "./users/UserTable.tsx";
import OrderTable from "./orders/OrderTable.tsx";
import ProductTable from "./products/ProductTable.tsx";
import {useState} from "react";

const MainDashboard = () => {

    const [currentDashboard] = useState("products");

    return (
        <main>
            {currentDashboard === "products" ? <ProductTable/>
                : currentDashboard === "users" ? <UserTable/>
                    : currentDashboard === "orders" ? <OrderTable/>
                        : null}
        </main>

    )
}

export default MainDashboard;
