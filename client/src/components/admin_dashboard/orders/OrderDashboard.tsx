import OrderTable from "./OrderTable";
import OrderDashboardNavbar from "./OrderDashboardNavbar.tsx";
import Divider from "../../ui/Divider.tsx";

const OrderDashboard = () => {
    return (
        <main>
            <OrderDashboardNavbar/>
            <Divider/>
            <OrderTable/>
        </main>
    )
}

export default OrderDashboard;