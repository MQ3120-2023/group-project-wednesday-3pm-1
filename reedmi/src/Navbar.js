import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import apiClient from './apiClient';
import { useNavigate } from 'react-router-dom';
/*Function responsible for navigating through the website in the header*/
function Navbar() {
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
                        <Link id="add-new-post" to="/login"> {/* Link for the user to sign out */}
                            Sign Out
                        </Link>
                      
                    </div>
                </div>
            </div>   
        </header>

    );
}
export default Navbar;
