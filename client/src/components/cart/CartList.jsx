import CartCard from "./CartCard.jsx";

const CartList = ({cartItems}) => {

    return (
        <>
            {
                cartItems.map(cartItem => (
                    <div key={cartItem.prodId}>
                        <CartCard cartItem={cartItem}/>
                    </div>
                ))
            }
        </>
    )
}

export default CartList