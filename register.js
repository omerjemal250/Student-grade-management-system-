import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const registerUser = async () => {
        setError('');
        setMessage('');

        try {
            await axios.post('/api/register', {
                username,
                email,
                password,
                role: 'admin'
            });

            setMessage('Registered successfully. You can now log in.');
            setTimeout(() => navigate('/login'), 1200);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className='container py-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card shadow-sm p-4'>
                        <h2 className='mb-3'>Create Account</h2>
                        <p className='text-muted mb-4'>Register a new admin account to start managing student grades.</p>
                        {message && <div className='alert alert-success'>{message}</div>}
                        {error && <div className='alert alert-danger'>{error}</div>}
                        <div className='mb-3'>
                            <label className='form-label'>Username</label>
                            <input
                                type='text'
                                placeholder='Username'
                                className='form-control'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
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
                            className='btn btn-success w-100'
                            onClick={registerUser}
                        >
                            Register
                        </button>
                        <div className='text-center mt-4'>
                            <span className='text-muted'>Already registered? </span>
                            <Link to='/login'>Login here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
