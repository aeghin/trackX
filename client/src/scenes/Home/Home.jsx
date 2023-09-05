import { useNavigate } from "react-router-dom";
const Home = () => {

    const navigate = useNavigate();

    const loginPage = () => {
        navigate('/login')
    };


    return (
        <>
            <div className='text-gray-800'>Home page</div>
            <button className='text-red-800'onClick={loginPage}>LOGIN</button>
        </>
    )
};

export default Home