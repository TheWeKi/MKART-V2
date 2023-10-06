import {useEffect, useState} from "react";
import {baseUrl} from "../../../axios/baseUrl.js";

const ProductTable = () => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await baseUrl.get("/products");
        setProducts(res.data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main>

            <div className="px-12">
                <table className="table table-zebra table-lg">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category / Company</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>


                    <tbody>

                    {
                        products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={product.image}
                                                    alt="Product Image"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.title}</div>
                                            <div className="text-sm opacity-50">{product.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {product.company}
                                    <br/>
                                    <span className="badge badge-ghost badge-sm">{product.category}</span>
                                </td>
                                <td>
                                    <button className="btn btn-outline btn-primary btn-sm">Modify</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline btn-error btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>


                </table>
            </div>

            {/* <Pagination/> */}

        </main>
    )
}

export default ProductTable;
