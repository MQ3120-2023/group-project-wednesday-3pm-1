import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Splash.css';
import CreateAccountOverlay from './CreateAccountOverlay';

function Splash() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

   
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/current_user')
            .then(response => {
               
                setUser(response.data);
                setLoading(false); 
            })
            .catch(error => {
                console.error('There was an issue with getting user information:', error);
                setLoading(false);
            });
    }, []);


    const handleRegister = () => {
        navigate('/register');
    };

    // Navigate to the Login page
    const handleLogin = () => {
        navigate('/login');
    };
 
    return (
        <div className="splash-main-container">
            <h2 className="splash-heading">Welcome To ReedMi</h2>
            <br />
            <br />
            {loading ? (
                <p className="splash-loading">Loading...</p> 
            ) : user ? (
                <div>
                    <p className="splash-welcome-text">Welcome back, {user.username}!</p>
                    
                </div>
            ) : (
                <div>
                   <button className="splash-temporary-button" onClick={handleRegister}>Sign Up</button>
                    <button className="splash-temporary-button" onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Splash;
