import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import apiClient from "./apiClient";


const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const passwordsMatch = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        return true;
    };

    const loginUser = async () => {
        try {
            // Attempt to login
            const response = await apiClient.post('/api/auth/login', { login: username, password: password });

            if (response.data) {
                navigate('/home');
            }
        } catch (err) {
            // Handle errors here by setting state so the user can know if their login attempt was unsuccessful
            setError('Failed to login. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await apiClient.post('/api/auth/register', {
                email: email,
                username: username,
                password: password,
                confirm: confirmPassword,
            });
            
            if (response.status === 200) {
                // Registration was successful, redirect the user to the login page
                loginUser();
              } else {
                // Registration was not successful, set the error state
                setError('Failed to register. Please try again.');
              }

            console.log(response.data);
        } catch (error) {
            console.error(error);
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
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>
                    <button className="register-btn" type="submit">
                        Register
                    </button>
                </form>
            )}
        </div>
    );
};

export default Register;
