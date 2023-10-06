import {useEffect, useState} from "react";
import {baseUrl} from "../../../axios/baseUrl.js";

const UserTable = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await baseUrl.get(`/users`, {
            headers: {
                Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
            }
        });
        setUsers(res.data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

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
                        users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    {user.id}
                                </td>
                                <td>
                                    {user.username}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.roleAdmin ? "Yes" : "No"}
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

export default UserTable;
