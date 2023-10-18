import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Register.css';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate(); // Get the navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

   
    const loginUser = async () => {
        try {
            
            await axios.post('http://localhost:3001/api/auth/login', userData, {
                withCredentials: true, 
                credentials: 'include'
            });
            navigate('/feed');
        } catch (loginErr) {
            
            setError('Automatic login failed. Please log in manually.');
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Register the user
            const response = await axios.post('http://localhost:3001/api/auth/register', userData);
            if (response.data) {
                setSuccess(true);
                setError(null);
                // Now, log the user in
                await loginUser(); // Automatically log in after successful registration
            }
        } catch (err) {
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <div className="error-message">{error}</div>}
            {success ? (
                <div className="success-message">Registration successful! Logging in...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>
            )}
        </div>
    );
};

export default Register;
