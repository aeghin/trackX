import { useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setLogin } from 'state';
import { toast } from 'sonner';


const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email!').required('Required!'),
    password: yup.string().required('Required!'),
});

const registerSchema = yup.object().shape({
    username: yup.string().max(6).required('Required'),
    email: yup.string().email('Invalid email!').required('Required!'),
    password: yup.string().min(8).required('Required!'),
});

export const Form = () => {
    const [pageType, setPageType] = useState('login');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = pageType === 'login';


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(isLogin ? loginSchema : registerSchema),
        defaultValues: isLogin
            ? { email: '', password: '' }
            : { username: '', email: '', password: '' },
    });

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            const url = `${process.env.REACT_APP_API_URL}auth/${isLogin ? 'login' : 'register'}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (res.ok) {
                reset();
                if (isLogin) {
                    dispatch(setLogin(result));
                    toast.success('Logged in!');
                    navigate('/dashboard');
                } else {
                    setPageType('login');
                    toast.success('Successfully registered!');
                }
            } else {
                toast.error('Wrong credentials, try again.');
            };
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred, please try again.');
        }
    };

    const toggleFormType = () => {
        setPageType(isLogin ? 'register' : 'login');
        reset();
    };

    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-16 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 border border-indigo-200">
                <div className='flex justify-center mb-6 py-2 px-2 rounded-lg bg-slate-100 font-semibold'>
                    <h1 className='text-slate-800'>{isLogin ? "Sign in" : "Sign Up"} to continue</h1>
                </div>
                {!isLogin && (
                    <div className="mb-6">
                        <input {...register('username')} placeholder="Username" className="w-full p-4 text-lg border rounded focus:border-indigo-400 focus:outline-none" />
                        <p className="text-red-500 text-xs italic mt-2">{errors.username?.message}</p>
                    </div>
                )}
                <div className="mb-6">
                    <input {...register('email')} placeholder="Email" className="w-full p-4 text-lg border rounded focus:border-indigo-400 focus:outline-none" />
                    <p className="text-red-500 text-xs italic mt-2">{errors.email?.message}</p>
                </div>
                <div className="mb-6">
                    <input {...register('password')} placeholder="Password" className="w-full p-4 text-lg border rounded focus:border-indigo-400 focus:outline-none" type="password" />
                    <p className="text-red-500 text-xs italic mt-2">{errors.password?.message}</p>
                </div>

                <button type="submit" className=" w-full bg-black text-white py-3 px-6 hover:bg-indigo-500 rounded focus:outline-none text-lg">{isLogin ? 'Sign In' : 'Sign Up'}</button>
                <button type="button" className=" w-full text-black hover:underline text-sm" onClick={toggleFormType}>{isLogin ? "Don't have an account? Sign up here!" : 'Already have an account? Login here!'}</button>

            </form>
        </div>
    );
};