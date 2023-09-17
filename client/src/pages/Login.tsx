import LoginForm from "../components/login/LoginForm.tsx";
import MiscLoginForm from "../components/login/MiscLoginForm.tsx";

const Login = () => {
    return (
        <div
            className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center gap-8 px-8">
            <LoginForm/>
            <MiscLoginForm/>
        </div>
    );
};

export default Login;