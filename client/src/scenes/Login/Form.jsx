import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';



const loginSchema = yup.object().shape({
    email: yup.string().email('invalid email!').required('required!'),
    password: yup.string().required('required!'),
});

const registerSchema = yup.object().shape({
    username: yup.string().max(6).required('required'),
    email: yup.string().email('invalid email!').required('required!'),
    password: yup.string().required('required!'),
});

const initialLoginValues = {
    email: '',
    password: '',
};

const initialRegisterValues = {
    username: '',
    email: '',
    password: '',
};


const Form = () => {

    const [pageType, setPageType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';

    const register = async (values, onSubmitProps) => {
        try {
            const userResponse = await fetch(
                'http://localhost:3001/auth/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                }
            );

            if (!userResponse.ok) {
                throw new Error(`Registration failed with status: ${userResponse.status}`);
            }

            const savedUser = await userResponse.json();
            onSubmitProps.resetForm();

            if (savedUser) {
                setPageType('login');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch('http://localhost:3001/auth/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

        const loggedIn = await loggedInResponse.json();

        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate('/dashboard');
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialLoginValues : initialRegisterValues}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                // errors,
                // touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
            }) => (
                <div className="bg-gray-200 min-h-screen flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="bg-white p-16 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                        {isRegister && (
                            <div className="mb-6">
                                <input
                                    className="w-full p-4 text-lg border rounded focus:border-indigo-400 focus:outline-none"
                                    type="text"
                                    placeholder="Username"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="username"
                                    value={values.username}
                                />
                            </div>
                        )}
                        <div className="mb-6">
                            <input
                                className="w-full p-4 text-lg border rounded focus:border-indigo-400 focus:outline-none"
                                type="email"
                                placeholder="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="email"
                                value={values.email}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                className="w-full p-4 text-lg border rounded focus:border-indigo-400 focus:outline-none"
                                type="password"
                                placeholder="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="password"
                                value={values.password}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <button className="bg-black text-white py-3 px-6 rounded focus:outline-none text-lg" type="submit">
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                            <button
                                className="text-black hover:underline text-sm"
                                type="button"
                                onClick={() => {
                                    setPageType(isLogin ? 'register' : 'login');
                                    resetForm();
                                }}
                            >
                                {isLogin ? "Don't have an account? Register here!" : 'Already have an account? Login here!'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default Form;