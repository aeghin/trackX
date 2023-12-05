import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLogout } from 'state';
import { persistor } from 'index.js';
import { FaUser } from 'react-icons/fa';



const Navbar = () => {
    const user = useSelector((state) => state.user);
    // const project = useSelector(state => state.projects);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const authenticated = Boolean(useSelector((state) => state.token));

    return (
        <nav className="bg-gray-100 shadow-lg border-b-4 border-indigo-200">
            <div className="flex px-6 py-3 md:flex md:justify-between md:items-center">

                <div className="flex justify-between items-center animate-swoop-in-left">
                    <Link to={authenticated ? "/dashboard" : "/"} className="text-4xl ml-4 font-bold text-gray-800">
                        TrackX
                    </Link>
                    <span className="ml-2 text-md text-gray-600 italic">- Your Path, <span className='text-indigo-600'>Clarified</span></span>
                </div>


                <div className="md:flex items-center animate-swoop-in-right">

                    <div className="flex flex-row items-center">
                        {authenticated ? (
                            <>
                                <div className="flex items-center mx-3 hover:text-indigo-600 transition duration-300">
                                    <FaUser className="text-indigo-500 mr-2 w-6 h-6" />
                                    <span className="font-medium text-gray-700">
                                        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                    </span>
                                </div>

                                {/* {project.length !== 0 && (
                                    <Link className="my-1 mx-2 px-6 py-2 bg-indigo-100 rounded border border-gray-300 text-md text-gray-700 font-medium hover:bg-indigo-200 md:mx-4 md:my-0" to="/dashboard">
                                        Dashboard
                                    </Link>
                                )} */}

                                <button
                                    onClick={() => {
                                        dispatch(setLogout());
                                        persistor.purge().then(() => {
                                            navigate("/");
                                        }).catch(error => {
                                            console.error('Persistor purge error: ', error);
                                        });
                                    }}
                                    className="my-1 mx-2 px-6 py-2 text-indigo-600 text-md rounded border border-gray-300 hover:bg-slate-300 hover:text-black transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            location.pathname !== "/login" && (
                                <Link className="mr-12 text-indigo-600 hover:bg-indigo-500 hover:text-white font-medium rounded-lg text-lg px-8 py-2.5 text-center transition duration-300 ease-in-out transform hover:-translate-y-0.5" to="/login">
                                    Login
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;