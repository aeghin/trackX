import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const goToSignIn = () => {
        navigate("/login")
    };
    return (
        <>

            {/* <div className='text-gray-800'>Home page</div>
            <button className='text-red-800' onClick={loginPage}>LOGIN</button> */}
            <div className="bg-[#f1f5f9] flex flex-col justify-center items-center h-screen pb-36">
                <div className="animate-swoop-in flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-mono">
                        Experience TrackX today!
                    </h1>
                    <h2 className="italic font-mono mb-4">
                        Keep your conflicts in control, always.
                    </h2>
                    <button onClick={goToSignIn} className="mx-auto w-1/4 bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-300">
                        Try for Free!
                    </button>
                </div>
            </div>

        </>
    )
};

export default Home