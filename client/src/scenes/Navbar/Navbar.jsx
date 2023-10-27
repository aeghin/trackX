import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { setLogout } from 'state';
import { persistor } from 'index.js';


const Navbar = () => {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    // console.log(user);
    const authenticated = Boolean(useSelector((state) => state.token));

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
                <div className="flex justify-between items-center animate-swoop-in-left">
                    <Link to={authenticated ? "/dashboard" : "/"} className="text-2xl font-bold text-gray-800">
                        TrackX
                    </Link>
                    <span className="ml-2 text-xs text-gray-600 italic">- Your Path, Clarified</span>
                </div>
                <div className="md:flex items-center animate-swoop-in-right">
                    <div className="flex flex-col md:flex-row md:mx-6">
                        {authenticated ? (
                            <>
                                <Link className="my-1 px-4 py-1 bg-indigo-100 rounded text-sm text-gray-700 font-medium hover:bg-indigo-200 md:mx-4 md:my-0" to="/dashboard">
                                    Dashboard
                                </Link>
                                <div className="relative">
                                    {/* User Icon */}
                                    <div onClick={toggleDropdown} className="bg-indigo-500 cursor-pointer text-white w-6 h-6 rounded-full flex items-center justify-center">
                                        {user.username.substring(0, 1).toUpperCase()}
                                    </div>
                                    {/* Dropdown */}
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                                            <button onClick={() => {
                                                dispatch(setLogout());
                                                persistor.purge().then(() => {
                                                    setDropdownOpen(false);
                                                }).catch(error => {
                                                    console.error('Persistor purge error: ', error);
                                                });
                                            }} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {location.pathname !== "/login" && (<Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/login">
                                    Login
                                </Link>

                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;