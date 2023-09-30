import ProductTable from "./ProductTable.jsx";
import ProductDashboardNavbar from "./ProductDashboardNavbar.jsx";
import Divider from "../../ui/Divider.jsx";

const ProductDashboard = () => {
    return (
        <main>
            <ProductDashboardNavbar/>
            <Divider/>
            <ProductTable/>
        </main>
    )
}

export default ProductDashboard;