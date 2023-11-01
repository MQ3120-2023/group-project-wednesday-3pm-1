import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
                        <Link id="add-new-post" to="/login">
                            Sign Out
                        </Link>
                    </div>
                </div>
            </div>   
        </header>

    );
}
export default Navbar;
