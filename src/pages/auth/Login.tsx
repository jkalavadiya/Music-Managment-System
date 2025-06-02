import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './auth.css';

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log('Login data:', data);
        try {
            console.log('Attempting to login...');
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'emilys',
                    password: 'emilyspass',
                    expiresInMins: 30,
                }),
            });
            const result = await response.json();
            console.log('Login response:', result);

            if (!response.ok) {
                throw new Error(result.message || 'Login failed');
            }

            localStorage.setItem('token', result.token);

            navigate('/playlists');
        } catch (err) {
            console.error('Error during login:', err);
            setError(
                err instanceof Error
                    ? err.message
                    : 'An error occurred during login'
            );
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-paper'>
                <h1 className='auth-title'>Music Playlist</h1>
                <h2 className='auth-subtitle'>Sign In</h2>
                {error && <p className='auth-error'>{error}</p>}
                <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className='auth-input'
                        type='text'
                        placeholder='Email Address'
                        defaultValue='emilys'
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
                        defaultValue='emilyspass'
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
