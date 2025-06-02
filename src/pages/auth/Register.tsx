import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './auth.css';

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log('Registration data:', data);
        try {
            console.log('Attempting to register user...');
            const response = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            });

            const result = await response.json();
            console.log('Registration response:', result);

            if (!response.ok) {
                throw new Error(result.message || 'Registration failed');
            }

            navigate('/login');
        } catch (err) {
            console.error('Error during registration:', err);
            setError(
                err instanceof Error
                    ? err.message
                    : 'An error occurred during registration'
            );
        }
    };

    const password = watch('password');

    return (
        <div className='auth-container'>
            <div className='auth-paper'>
                <h1 className='auth-title'>Music Playlist</h1>
                <h2 className='auth-subtitle'>Create Account</h2>
                {error && <p className='auth-error'>{error}</p>}
                <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className='auth-input'
                        type='text'
                        placeholder='Username'
                        {...register('username', {
                            required: 'Username is required',
                        })}
                    />
                    {errors.username && (
                        <p className='auth-error'>{errors.username.message}</p>
                    )}

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

                    <input
                        className='auth-input'
                        type='password'
                        placeholder='Confirm Password'
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === password || 'Passwords do not match',
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className='auth-error'>
                            {errors.confirmPassword.message}
                        </p>
                    )}

                    <button type='submit' className='auth-button'>
                        Sign Up
                    </button>
                    <div className='auth-link'>
                        <button
                            type='button'
                            onClick={() => navigate('/login')}>
                            Already have an account? Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
