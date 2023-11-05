import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Using the same CSS file as LoginPage
import apiClient from './apiClient';

const Register = ({ setLoggingIn }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const logoutUser = async () => {
        try {
            await apiClient.post('/api/auth/logout', {}, { withCredentials: true });
        } catch (err) {
            console.error(err);
        }
    };

    const loginUser = async () => {

        setLoggingIn(true);

        try {

           

            await apiClient.post('/api/auth/login', {
                login: userData.username,
                password: userData.password,
            }, {
                withCredentials: true
            });

            setLoggingIn(true);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Please try again.');
        }
    };

    const registerUser = async () => {
        try {
            const response = await apiClient.post('/api/auth/register', {
                email: userData.email,
                username: userData.username,
                password: userData.password,
                confirm: userData.confirmPassword,
            });

            if (response.status === 200) {
                await logoutUser();
                loginUser();
            } else {
                setError('Failed to register. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser();
    };

    return (
        <div className="page-container">
            <div className="welcome-section">
                <h1 className='welcomeText'> Welcome to ReedMi</h1>
            </div>
            <div className="login-section">
                <div className="login-content">
                    <h2>Sign Up</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={userData.email}
                                onChange={handleInputChange}
                                className="login-input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text" 
                                name="username"
                                placeholder="Username" 
                                required
                                value={userData.username}
                                onChange={handleInputChange}
                                className="login-input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={userData.password}
                                onChange={handleInputChange}
                                className="login-input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                value={userData.confirmPassword}
                                onChange={handleInputChange}
                                className="login-input"
                            />
                        </div>
                        <div className="loginbuttons">
                            <button type="submit" className="login-button">Register</button>
                        </div>
                    </form>
                    <p className="signup-text">
                        Already have an account? <span className="signup-link" onClick={() => navigate("/login")}>Log In</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
