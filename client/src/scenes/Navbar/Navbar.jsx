import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


const Navbar = () => {


    const authenticated = Boolean(useSelector((state) => state.token));

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        TrackX
                    </Link>
                    <span className="ml-2 text-xs text-gray-600 italic">- Your Path, Clarified</span>
                </div>

                <div className="md:flex items-center">
                    <div className="flex flex-col md:flex-row md:mx-6">
                        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/about">
                            About
                        </Link>
                        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/contact">
                            Contact
                        </Link>
                        {authenticated ? (
                            <>
                                <Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/dashboard">
                                    Dashboard
                                </Link>
                                <Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/logout">
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/login">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;