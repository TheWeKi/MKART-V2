import CartCard from "./CartCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../axios/baseUrl.js";
import productDetail from "../../pages/ProductDetail.jsx";

const CartList = ({cartItems}) => {

    return (
        <>
            {
                cartItems.map(cartItem=> (
                    <div key={cartItem.prodId}>
                        <CartCard cartItem={cartItem}/>
                    </div>
                ))
            }
        </>
    )
}

export default CartList