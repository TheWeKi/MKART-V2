import Pagination from "../../product_list/Pagination.tsx";

const ProductTable = () => {

    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <main>

            <div className="px-12">
                <table className="table table-zebra table-lg">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category / Company </th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>


                    <tbody>

                    {
                        ids.map(i => (
                            <tr key={i}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                                    alt="Avatar Tailwind CSS Component"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Title</div>
                                            <div className="text-sm opacity-50">#6849398027028</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Category
                                    <br/>
                                    <span className="badge badge-ghost badge-sm">Company</span>
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

            <Pagination/>

        </main>
    )
}

export default ProductTable;
