import {BrowserRouter, Route, Routes} from "react-router-dom"
import ProductList from "./pages/ProductList.jsx"
import Home from "./pages/Home.jsx"
import Navbar from "./components/layout/Navbar.jsx"
import Footer from "./components/layout/Footer.jsx"
import Divider from "./components/ui/Divider.jsx"
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx"
import CreateProduct from "./components/admin_dashboard/products/CreateProduct.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Divider/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products" element={<ProductList/>}/>
                    <Route path="/product-detail/:productId" element={<ProductDetail/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>

                    <Route path="/admin-dashboard/:dashboard" element={<AdminDashboard/>}/>
                    <Route path="/admin-dashboard/products/create-product" element={<CreateProduct/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>

                <Divider/>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App