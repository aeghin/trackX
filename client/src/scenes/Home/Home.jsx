import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import { toast } from "sonner";

const Home = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/login");
    };

    const guest = {
        email: 'test@test.com',
        password: 'test1234'
    }

    const dispatch = useDispatch();

    const onSubmit = async () => {



        try {
            const url = "http://localhost:3001/auth/login";
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guest),
            });
            const result = await res.json();
            // console.log(result);
            if (res.ok) {
                dispatch(setLogin(result));
                navigate('/dashboard');
                toast.success('Hello, Guest!');
            } else {
                toast.error('Something went wront :(');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred, please try again.');
        }
    };
    return (
        <>
            <div className="bg-[#f1f5f9] flex flex-col justify-center items-center h-screen pb-36">
                <div className="animate-swoop-in flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-mono">
                        Experience TrackX today!
                    </h1>
                    <h2 className="italic font-mono mb-4">
                        Keep your conflicts in control, always.
                    </h2>
                    <button onClick={clickHandler} className="mx-auto w-[160px] bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-300">
                        Register for free!
                    </button>
                    <button onClick={onSubmit} className="text-sm mt-2 text-gray-500 hover:text-indigo-500 focus:outline-none">
                        or try the app!
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home