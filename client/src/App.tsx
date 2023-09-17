import {BrowserRouter, Route, Routes} from "react-router-dom"
import ProductList from "./pages/ProductList"
import Home from "./pages/Home"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Divider from "./components/ui/Divider"
import Login from "./pages/Login.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProductDetail from "./pages/ProductDetail.tsx"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Divider/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products" element={<ProductList/>}/>
                    <Route path="/productDetail" element={<ProductDetail/>}/>
                    <Route path="/login" element={<Login/>}/>
                    
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>

                <Divider/>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App