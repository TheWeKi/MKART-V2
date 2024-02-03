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
import Checkout from "./pages/Checkout.jsx";
import Order from "./pages/Order.jsx"
import { AuthenticatedRoute } from "./utils/AuthenticatedRoute.jsx"


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
                    <Route path="/cart" element={<AuthenticatedRoute><Cart/></AuthenticatedRoute>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/checkout" element={<AuthenticatedRoute><Checkout/></AuthenticatedRoute>}/>
                    <Route path="/orders" element={<AuthenticatedRoute><Order/></AuthenticatedRoute>}/>


                    <Route path="/admin-dashboard/:dashboard" element={<AuthenticatedRoute><AdminDashboard/></AuthenticatedRoute>}/>
                    <Route path="/admin-dashboard/products/create-product" element={<AuthenticatedRoute><CreateProduct/></AuthenticatedRoute>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>

                <Divider/>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App