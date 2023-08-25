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
    displayName: yup.string().max(6).required('required'),
    email: yup.string().email('invalid email!').required('required!'),
    password: yup.string().required('required!'),
});

const initialLoginValues = {
    email: '',
    password: '',
};

const initialRegisterValues = {
    displayName: '',
    email: '',
    password: '',
};


const Form = () => {

    const [pageType, setPageType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === 'login';
    const isRegiater = pageType === 'register';



    return (
        <Formik onSubmit={} >
            {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form>
            
        </form>

        )}
        </Formik>
    )
};

export default Form;