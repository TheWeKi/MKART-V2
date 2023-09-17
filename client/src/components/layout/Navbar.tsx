import {Link} from 'react-router-dom'
import {useState} from "react";

const Navbar = () => {

    const [isAuthenticated] = useState(false);

    return (
        <>
            <div className="navbar bg-base-100 min-h-[8vh] px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h7"/>
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
                            <Link to='/login'>
                                <button className="btn btn-ghost btn-outline">
                                    Login
                                </button>
                            </Link> :
                            <Link to='/logout'>
                                <button className="btn btn-ghost btn-outline">
                                    Logout
                                </button>
                            </Link>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar