import OrderTable from "./OrderTable.jsx";
import OrderDashboardNavbar from "./OrderDashboardNavbar.jsx";
import Divider from "../../ui/Divider.jsx";

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