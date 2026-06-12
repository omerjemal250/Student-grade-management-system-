import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const loginUser = async () => {
        setError('');

        try {
            const response = await axios.post('/api/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid login details.');
        }
    };

    return (
        <div className='container py-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card shadow-sm p-4'>
                        <h2 className='mb-3'>Admin Login</h2>
                        <p className='text-muted mb-4'>Sign in to manage students, courses and grades.</p>
                        {error && <div className='alert alert-danger'>{error}</div>}
                        <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input
                                type='email'
                                placeholder='Email'
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='form-label'>Password</label>
                            <input
                                type='password'
                                placeholder='Password'
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className='btn btn-primary w-100'
                            onClick={loginUser}
                        >
                            Login
                        </button>
                        <div className='text-center mt-4'>
                            <span className='text-muted'>Don't have an account? </span>
                            <Link to='/register'>Register now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
