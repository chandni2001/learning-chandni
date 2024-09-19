import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const { token } = useSelector((state) => state.auth); // Access token from Redux state

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {token ? ( // Check if token exists to determine if user is logged in
                    <>
                        <li className="navbar-item">
                            <Link to="/categories" className="navbar-link">Categories</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/register" className="navbar-link">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
