import {Link} from "react-router-dom";

const NoAccountSignUp = () => {
    return (
        <>
            <div className="card-body card-bordered border-base-300 rounded-box flex flex-row justify-evenly">
                    <span className="text-center text-lg font-semibold">
                        No Account?
                    </span>
                <div>
                    <Link to='/signup'>
                        <button className="btn btn-outline">Sign Up</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NoAccountSignUp;