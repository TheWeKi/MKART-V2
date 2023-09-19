import Pagination from "../../product_list/Pagination.tsx";

const UserTable = () => {

    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <main>

            <div className="px-12">
                <table className="table table-zebra table-lg">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Admin Role</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>


                    <tbody>

                    {
                        ids.map(i => (
                            <tr key={i}>
                                <td>
                                    7869097709
                                </td>
                                <td>
                                    username
                                </td>
                                <td>
                                    email@email.email
                                </td>
                                <td>
                                    false
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

export default UserTable;
