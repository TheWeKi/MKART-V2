import SignUpForm from "../components/sign_up/SignUpForm.tsx";
import MiscSignUpForm from "../components/sign_up/MiscSignUpForm.tsx";

const SignUp = () => {
    return (
        <div
            className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center gap-8 px-8">
            <SignUpForm/>
            <MiscSignUpForm/>
        </div>
    );
};

export default SignUp;