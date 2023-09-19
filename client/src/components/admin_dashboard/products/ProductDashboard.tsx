import ProductTable from "./ProductTable";
import ProductDashboardNavbar from "./ProductDashboardNavbar.tsx";
import Divider from "../../ui/Divider.tsx";

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