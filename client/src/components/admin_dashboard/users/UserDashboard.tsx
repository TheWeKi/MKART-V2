import UserTable from "./UserTable";
import UserDashboardNavbar from "./UserDashboardNavbar.tsx";
import Divider from "../../ui/Divider.tsx";

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