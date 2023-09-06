import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


// import { Mail, LogIn } from 'lucide-react';




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
                <form onSubmit={handleSubmit} >
                    {isRegister && (
                        <>
                            <Input className='my-1 ml-4'
                                type='text'
                                placeholder='username'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name='username'
                                value={values.username}
                            // error={Boolean(touched.username) && Boolean(errors.username)}
                            // helperText={touched.username && errors.username}
                            />
                        </>
                    )}
                    <Input
                        className='my-1 ml-4'
                        type='email'
                        placeholder='email'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='email'
                        value={values.email}
                    // error={Boolean(touched.email) && Boolean(errors.email)}
                    // helperText={touched.email && errors.email}
                    />
                    <Input
                        className='my-1 ml-4'
                        type='password'
                        placeholder='password'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='password'
                        value={values.password}
                    // error={Boolean(touched.password) && Boolean(errors.password)}
                    // helperText={touched.password && errors.password}
                    />

                    {/* Button */}

                    <Button variant='default' size='sm' className='ml-4' type='submit'>
                        {isLogin ? 'LOGIN' : 'REGISTER'}
                    </Button>

                    <Button variant='link' size='sm' onClick={() => {
                        setPageType(isLogin ? 'register' : 'login');
                        resetForm();
                    }}>
                        {isLogin ? "Don't have an account? Register here!" : "Already have an account? Login here!"}
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default Form;