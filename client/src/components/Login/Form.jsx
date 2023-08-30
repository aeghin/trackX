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

        const userResponse = await fetch(
            'http://localhost:3001/auth/register',
            {
                method: 'POST',
                body: JSON.stringify(values),
            }
        );

        const savedUser = await userResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType('login')
        };
    };


    return (
        <Formik onSubmit={ } >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit} >
                    {isRegister && (
                        <>
                            <input
                                type='text'
                                placeholder='username...'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name='username'
                                values={values.username}
                                error={Boolean(touched.username) && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                            />
                        </>
                    )}
                    <input
                        type='email'
                        placeholder='email...'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='email'
                        values={values.email}
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <input
                        type='password'
                        placeholder='password...'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='password'
                        values={values.password}
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />

                    {/* Button */}

                    <button type='submit'>
                        {isLogin ? 'LOGIN' : 'REGISTER'}
                    </button>
                    <p onClick={() => {
                        setPageType(isLogin ? 'register' : 'login');
                        resetForm();
                    }}>
                        {isLogin ? "Don't have an account? Register here!" : "Already have an account? Login here!"}
                    </p>

                </form>

            )}
        </Formik>
    )
};

export default Form;