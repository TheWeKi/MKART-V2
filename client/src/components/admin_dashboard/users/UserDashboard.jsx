import UserTable from "./UserTable.jsx";
import UserDashboardNavbar from "./UserDashboardNavbar.jsx";
import Divider from "../../ui/Divider.jsx";

const UserDashboard = () => {
    return (
        <main>
            <UserDashboardNavbar/>
            <Divider/>
            <UserTable/>
        </main>
    )
}

export default UserDashboard;