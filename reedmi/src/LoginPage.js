// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import CreateAccountOverlay from './CreateAccountOverlay';

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

    const [showOverlay, setShowOverlay] = useState(false);

    const openOverlay = () => {
        navigate("/register")
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };


  
    const loginUser = async () => {
        try {
            const response = await axios.post('/api/auth/login', {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser();
    };

    const handleGoogleSignIn = () => {
        console.log("Google Sign-In");
        window.location.href = "/api/auth/google";
    };

    return (
        <div className="page-container">
            <div className="welcome-section">
                <h1>Welcome to ReedMi</h1>
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
                        <button type="submit" className="login-button">Log In</button>

                     

                    </form>

                    <button onClick={handleGoogleSignIn} className="gsi-material-button">
                            <div className="gsi-material-button-state"></div>
                            <div className="gsi-material-button-content-wrapper">
                                <div className="gsi-material-button-icon">
                                    <svg viewBox="0 0 48 48">
                                        {/* Insert your SVG paths here */}
                                    </svg>
                                </div>
                                <span className="gsi-material-button-contents">Continue with Google</span>
                                <span style={{display: "none"}}>Continue with Google</span>
                            </div>
                        </button>

                    <p className="signup-text">
                New Here? <span className="signup-link" onClick={openOverlay}>Create Account</span>
            </p>

            


            {showOverlay && <CreateAccountOverlay onClose={closeOverlay} loginUser={loginUser} />}

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
