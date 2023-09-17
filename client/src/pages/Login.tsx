import Divider from "../components/ui/Divider.tsx";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div
            className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center gap-8 px-8">

            {/*login*/}
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered rounded-box">
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
                        <button className="btn btn-outline">Login</button>
                    </div>
                </div>
            </div>

            {/*oauth login*/}
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered rounded-box">
                    <div className="text-center text-xl font-semibold">
                        Third Party Login
                        <Divider/>
                    </div>
                    <div className="flex flex-row justify-evenly">
                        {/*Google*/}
                        <div>
                            <button className="btn btn-ghost btn-border">
                                <svg className="h-8 w-8 fill-current" fill="none" stroke="currentColor"
                                     viewBox="0 0 512 512">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                                </svg>
                            </button>
                        </div>

                        {/*Github*/}
                        <div>
                            <button className="btn btn-ghost btn-border">
                                <svg viewBox="0 0 512 512" fill="none" stroke="currentColor"
                                     className="h-8 w-8 fill-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-4 h-4"></div>
                <div className="card-body card-bordered rounded-box flex flex-row justify-evenly">
                    <span className="text-center text-lg font-semibold">
                        No Account?
                    </span>
                    <div>
                        <Link to='/signup'>
                            <button className="btn btn-outline">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;