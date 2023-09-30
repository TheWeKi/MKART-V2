import {Link} from "react-router-dom";

const AccountLogin = () => {
    return (
        <>
            <div className="card-body card-bordered border-base-300 rounded-box flex flex-row justify-evenly">
                    <span className="text-center text-lg font-semibold">
                        Already Have An Account?
                    </span>
                <div>
                    <Link to='/login'>
                        <button className="btn btn-outline">Login</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AccountLogin;