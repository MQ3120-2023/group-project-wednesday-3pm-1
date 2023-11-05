import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import apiClient from '../apiClient';
import { baseURL } from '../apiClient';

function Navbar() {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);  // New state to track loading status

    useEffect(() => {
        apiClient.get('/api/auth/current_user')
            .then(response => {
                setUsername(response.data.username);
                setIsLoading(false);  // Set loading status to false once data is fetched
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);  // Set loading status to false even if there is an error
            });
    }, []);

    let url = `${baseURL}/api/auth/logout`;

    // Conditional rendering based on loading status
    if (isLoading) {
        return  <header className="App-header">
        <div className="header-contents">
            </div>
        </header>
    }

    return (
        <header className="App-header">
            <div className="header-contents">
                <p className="header-title header-link">
                    <Link className="header-link" to={"/home"}>
                        ReedMi
                    </Link>
                </p>
                <div className="navOptions"> 
                    <Link className="header-link header-link-secondary" to="/techNews">
                        TechNews
                    </Link>
                    <div className="navbar-links">
                        <Link id="add-new-post" to="/createNewPost">
                            Add New Post +
                        </Link>
                    </div>
                    <div className="navbar-links">
                        <Link id="add-new-post" to={`${url}`}>
                            Log Out '{username}'
                        </Link>
                    </div>
                </div>
            </div>   
        </header>
    );
}

export default Navbar;
