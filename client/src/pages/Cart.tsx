import CartList from "../components/cart/CartList.tsx";

const Cart = () => {
    return (
        <>
            <section>
                <div className="min-h-[70vh] bg-base-100 flex flex-col lg:flex-row place-content-evenly  px-8">
                    <div className="flex-col max-w-lg w-full  mx-auto px-8">

                        <CartList/>

                    </div>

                    <div className="flex-col max-w-lg w-full mx-auto px-8 py-8">
                        <header className="text-center">
                            <h1 className='text-4xl mb-2'>Order Summary</h1>
                        </header>

                        <div className="mt-8 flex justify-between border-t border-gray-100 pt-8">

                            <div className="text-lg">SubTotal</div>
                            <div className="text-lg">$99</div>

                        </div>
                        <div className="mt-8 flex justify-between ">

                            <div className="text-lg">Shipping</div>
                            <div className="text-lg">$20</div>

                        </div>
                        <div className="mt-8 flex justify-between ">

                            <div className="text-lg">Tax</div>
                            <div className="text-lg">$13</div>

                        </div>

                        <div className="mt-8 flex justify-between ">

                            <h2 className="text-xl font-semibold">Total</h2>
                            <h2 className="text-xl font-semibold">$350</h2>

                        </div>

                        <div className="mt-8 flex justify-center ">

                            <button className="btn btn-lg mt-4 btn-outline">Add To Cart</button>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
