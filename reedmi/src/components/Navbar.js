import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import apiClient from '../apiClient';

function Navbar() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        apiClient.get('/api/auth/current_user')
            .then(response => setUsername(response.data.username))
            .catch(error => console.error(error));
    }, []);

    return (
        <header className="App-header">
            <div className="header-contents">
                <p className="header-title header-link">
                    <Link className="header-link" to={"/home"}> {/* Link back to Home page */}
                        ReedMi
                    </Link>
                </p>
                <div className="navOptions"> 
                    <Link className="header-link header-link-secondary" to="/techNews"> {/* Link to TechNews section */}
                        TechNews
                    </Link>
                    <div className="navbar-links">
                        <Link id="add-new-post" to="/createNewPost"> {/* Link to Add new posts */}
                            Add New Post +
                        </Link>
                    </div>

                    <div className="navbar-links">
                        <Link id="add-new-post" to="/login">
                            Log Out '{username}'
                        </Link>
                    </div>
                </div>
            </div>   
        </header>
    );
}
export default Navbar;