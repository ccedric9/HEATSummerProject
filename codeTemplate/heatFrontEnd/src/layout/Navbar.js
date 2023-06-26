import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <div>
            {/* Top Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Assessment Tools
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <Link className="nav-link " to="/" id="assessTimeTable" role="button" data-bs-toggle="dropdown">
                                Home
                            </Link>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="supporting" role="button" data-bs-toggle="dropdown">
                                    Supporting
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="supporting">
                                    <Link className="dropdown-item" to="/support/option1">Option 1</Link>
                                    <Link className="dropdown-item" to="/support/option2">Option 2</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/adminAccess">
                                    Admin Access Button
                                </Link>
                            </li>

                        </ul>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <button className="btn btn-outline-light dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    👤Lionel Messi ⚙️
                                </button>
                                <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><span className="dropdown-item custom-dropdown-item"><span role="img" aria-label="student">👨‍🎓</span> Student number: 48593</span></li>
                                    <li><span className="dropdown-item custom-dropdown-item"><span role="img" aria-label="message">📧</span> Unread message: 7</span></li>
                                    <li><span className="dropdown-item custom-dropdown-item"><span role="img" aria-label="due">📅</span> Dues in the next week: 3</span></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/exit">
                                    Log out
                                </Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </nav>

            {/* Main Content */}
            <div style={{ marginLeft: '200px', paddingTop: '60px' }}>
                {/* This is where the main content will be rendered */}
            </div>
        </div>
    );
}
