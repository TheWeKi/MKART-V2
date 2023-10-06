import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { login,logout } from '../../redux/features/authSlice.js';

const Navbar = () => {

        const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);//Get the state from redux store to check if user is logged in or not
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const token = document.cookie.split("token=")[1];
        if(!token){
            dispatch(logout());//Set the state to false if token is not present in cookies in case of page refresh
        }
        else{
            dispatch(login()); //Set the state to true if token is present in cookies in case of page refresh
        }
        const setLogout = () => {
            document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //Delete the token from cookies if user clicks on logout button
            dispatch(logout()); //Set the state to false if user clicks on logout button
            navigate('/login');
        };

    return (
        <>
            <div className="navbar bg-base-100 min-h-[8vh] px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </label>
                        <ul tabIndex={0}
                            className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/products'>Products</Link>
                            </li>
                            <li>
                                <Link to='/cart'>Cart</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <Link to='/' className="btn btn-ghost hover:bg-transparent normal-case text-xl">MKART</Link>
                </div>
                <div className="navbar-end">
                    {
                        isAuthenticated ?
                                <button className="btn btn-ghost btn-outline" onClick={() =>setLogout()}>
                                    Logout
                                </button>
                            :
                            <Link to="/login"> <button className="btn btn-ghost btn-outline">
                                    Login
                            </button>
                            </Link>
                           
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar