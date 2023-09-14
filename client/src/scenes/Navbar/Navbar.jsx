import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { setLogout } from 'state';;


const Navbar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // console.log(user);
    const authenticated = Boolean(useSelector((state) => state.token));

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
                <div className="flex justify-between items-center animate-swoop-in-left">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        TrackX
                    </Link>
                    <span className="ml-2 text-xs text-gray-600 italic">- Your Path, Clarified</span>
                </div>
                <div className="md:flex items-center animate-swoop-in-right">
                    <div className="flex flex-col md:flex-row md:mx-6">
                        {authenticated ? (
                            <>
                                <Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/dashboard">
                                    Dashboard
                                </Link>
                                <button onClick={() => dispatch(setLogout())}className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0">
                                    Logout
                                </button>
                                <h3 className="my-1 text-sm font-medium text-indigo-500 md:mx-4 md:my-0">
                                    Howdy, {user.username}
                                </h3>

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