import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccountOverlay.css';

const CreateAccountOverlay = ({ onClose, loginUser }) => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });

        if (name === 'password') {
            setPasswordValid(true);
        }

        if (name === 'confirmPassword') {
            setConfirmPasswordValid(userData.password === value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', userData);
            if (response.data) {
                setSuccess(true);
                setError(null);
                loginUser();
            }
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div className="overlay">
            <div className="overlay-content">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={userData.username}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={userData.password}
                        onChange={handleInputChange}
                        className={passwordValid ? "valid" : "invalid"}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        value={userData.confirmPassword}
                        onChange={handleInputChange}
                        className={confirmPasswordValid ? "valid" : "invalid"}
                    />
                    <button type="submit" disabled={!passwordValid || !confirmPasswordValid}>
                        Register
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <button className="close-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default CreateAccountOverlay;
