const SignUpForm = () => {
    return (
        <>
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Username</span>
                        </label>
                        <input type="text" placeholder="username" className="input input-bordered"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered"/>
                        {/*<label className="label">*/}
                        {/*    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>*/}
                        {/*</label>*/}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-outline">Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;