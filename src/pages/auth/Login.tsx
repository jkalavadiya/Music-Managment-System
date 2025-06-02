import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './auth.css';

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log('Login attempt:', data);
    };

    return (
        <div className='auth-container'>
            <div className='auth-paper'>
                <h1 className='auth-title'>Music Playlist</h1>
                <h2 className='auth-subtitle'>Sign In</h2>
                <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className='auth-input'
                        type='email'
                        placeholder='Email Address'
                        {...register('email', {
                            required: 'Email is required',
                        })}
                    />
                    {errors.email && (
                        <p className='auth-error'>{errors.email.message}</p>
                    )}

                    <input
                        className='auth-input'
                        type='password'
                        placeholder='Password'
                        {...register('password', {
                            required: 'Password is required',
                        })}
                    />
                    {errors.password && (
                        <p className='auth-error'>{errors.password.message}</p>
                    )}

                    <button type='submit' className='auth-button'>
                        Sign In
                    </button>
                    <div className='auth-link'>
                        <button
                            type='button'
                            onClick={() => navigate('/register')}>
                            Don't have an account? Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
