import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import GoogleButton from 'react-google-button';
import apiClient from './apiClient';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://reedmi-test.onrender.com' : 'http://localhost:3001';

const LoginPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };


    const openOverlay = () => {
        navigate("/register")
    };

    const loginUser = async () => {
        try {
            const response = await apiClient.post('/api/auth/login', {
                login: userData.username,
                password: userData.password,
            }, {
                withCredentials: true
            });

            if (response.data) {
                navigate('/home');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Please try again.');
        }
    };

   /* const logoutUser = async () => {
        try {
            const response = await apiClient.post('/api/auth/logout', {}, {
                withCredentials: true
            });

            if (response.data) {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        logoutUser();
    }, []); */

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser();
    };

    const handleGoogleSignIn = () => {
        console.log("Google Sign-In");
       // apiClient.get('/api/auth/google', { withCredentials: true })
        window.location.href = `${baseURL}/api/auth/google`;
    };

    return (
        <div className="page-container">
            <div className="welcome-section">
                <h1 className='welcomeText'> Welcome to ReedMi</h1>
            </div>
            <div className="login-section">
                <div className="login-content">
                    <h2>Sign In</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
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
                        
                        <div className="loginbuttons">
                            <button type="submit" className="login-button">Log In</button>
                            <GoogleButton className='googlebutton'
                                type="light" // can be light or dark
                                onClick={(handleGoogleSignIn)}
                            />
                           
                        </div>
                    </form>
                    <p className="signup-text">
                        New Here? <span className="signup-link" onClick={openOverlay}>Create Account</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
