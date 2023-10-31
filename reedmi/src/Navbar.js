import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <header className="App-header">
            <p className="header-title">
                <Link className="header-link" to={"/home"}>
                    ReedMi
                </Link>
            </p>
            <div className="navOptions">
                <Link className="header-link" to="/techNews">
                    TechNews
                </Link>
                <div className="navbar-links">
                    <Link id="add-new-post" to="/createNewPost">
                        Add New Post +
                    </Link>
                </div>
            </div>   
        </header>

    );
}
export default Navbar;
