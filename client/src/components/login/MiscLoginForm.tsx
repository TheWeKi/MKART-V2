import ThirdPartyLogin from "./ThirdPartyLogin.tsx";
import NoAccountSignUp from "./NoAccountSignUp.tsx";

const MiscLoginForm = () => {
    return (
        <>
            {/*oauth login*/}
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <ThirdPartyLogin/>
                <div className="my-2"></div>
                <NoAccountSignUp/>
            </div>
        </>
    );
};

export default MiscLoginForm;