import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Splash.css';

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

    const navigateToFeed = () => {
        navigate('/feed');
    };

    const temporaryButtonHandler = () => {
        console.log('Temporary button clicked');
        navigateToFeed();
    };

    const handleAddUser = () => {
        navigate('/register');
    };
    return (
        <div className="splash-main-container">
            <h2>Welcome To ReedMi</h2>
            <br />
            <br />
            {loading ? (
                <p>Loading...</p> 
            ) : user ? (
                <div>
                    <p>Welcome back, {user.username}!</p>
                    <button className="splash-temporary-button" onClick={navigateToFeed}>Go to Feed</button>
                </div>
            ) : (
                <div>
                    <button className="splash-temporary-button" onClick={handleAddUser}>Sign Up</button>
                    <button className="splash-temporary-button" onClick={temporaryButtonHandler}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Splash;
