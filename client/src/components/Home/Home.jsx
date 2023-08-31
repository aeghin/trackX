import { useNavigate } from "react-router-dom";
const Home = () => {

    const navigate = useNavigate();

    const loginPage = () => {
        navigate('/login')
    };


    return (
        <>
            <div>Home page</div>
            <button onClick={loginPage}>LOGIN</button>
        </>
    )
};

export default Home