import {useParams} from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage.tsx";
import ProductDashboard from "./products/ProductDashboard.tsx";
import UserDashboard from "./users/UserDashboard.tsx";
import OrderDashboard from "./orders/OrderDashboard.tsx";

const MainDashboard = () => {
    const {dashboard} = useParams<string>();

    return (
        <main>
            {dashboard === "products" ? <ProductDashboard/>
                : dashboard === "users" ? <UserDashboard/>
                    : dashboard === "orders" ? <OrderDashboard/>
                        : <ErrorPage/>}
        </main>

    )
}

export default MainDashboard;
