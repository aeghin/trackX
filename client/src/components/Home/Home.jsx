import { useNavigate } from "react-router-dom";
const Home = () => {

    const navigate = useNavigate();

    const loginPage = () => {
        navigate('/login')
    };


    return (
        <>
            <div className="text-red-500">Home page</div>
            <button onClick={loginPage}>LOGIN</button>
        </>
    )
};

export default Home