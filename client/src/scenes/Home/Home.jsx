import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import { toast } from "sonner";
import { FeatureSection } from "scenes/FeatureSection/FeatureSection";
import { Footer } from "scenes/Footer/Footer";
import { useRef, useEffect } from "react";
import bgImage from '../../assets/hero.jpg';

const Home = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/login");
    };

    const guest = {
        email: process.env.REACT_APP_EMAIL,
        password: process.env.REACT_APP_PW
    }

    const dispatch = useDispatch();

    const onSubmit = async () => {

        try {
            const url = `${process.env.REACT_APP_API_URL}auth/login`
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

    const sectionRef = useRef(null);

    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-swoop-in');
                }
            });
        }, { threshold: 0.5 });

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (

        <>
            <FeatureSection />
            <div className="relative flex flex-col justify-center items-center h-screen border-b-4 border-t-4 border-indigo-200 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50"></div>
                <div ref={sectionRef} className="z-10 p-4 flex flex-col justify-center items-center p-4">
                    <h1 className="text-4xl text-white font-mono">
                        Experience TrackX today!
                    </h1>
                    <h2 className="italic text-gray-400 font-mono mb-4">
                        Keep your conflicts in control, <span className='text-indigo-400'>always.</span>
                    </h2>
                    <button onClick={clickHandler} className="mx-auto w-[160px] bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-300">
                        Register for free!
                    </button>
                    <button onClick={onSubmit} className="text-sm mt-2 text-gray-400 hover:text-indigo-500 focus:outline-none">
                        or try the app!
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Home