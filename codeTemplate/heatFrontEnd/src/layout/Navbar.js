/* Navbar.js */

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <div>
            {/* Top Navigation */}
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container-fluid">
                    <Link className="navbar-brand custom-brand" to="/">
                        <span role="img" aria-label="tools">🛠️</span> Assessment Calendar Tools
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link custom-link" to="/">
                                    <span role="img" aria-label="home">🏠</span> Home
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle custom-link" to="#" id="supporting" role="button" data-bs-toggle="dropdown">
                                    <span role="img" aria-label="help">📚</span> Supporting
                                </Link>
                                <div className="dropdown-menu custom-dropdown-menu" aria-labelledby="supporting">
                                    <Link className="dropdown-item custom-dropdown-item" to="/support/option1"><span role="img" aria-label="one">1️⃣</span> Option 1</Link>
                                    <Link className="dropdown-item custom-dropdown-item" to="/support/option2"><span role="img" aria-label="two">2️⃣</span> Option 2</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light custom-button" to="/adminAccess">
                                    <span role="img" aria-label="database">💾</span> Database
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <button className="btn btn-outline-light dropdown-toggle custom-button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    👤Lionel Messi ⚙️
                                </button>
                                <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><span className="dropdown-item custom-dropdown-item"><span role="img" aria-label="student">👨‍🎓</span> Student number: 48593</span></li>
                                    <li><span className="dropdown-item custom-dropdown-item"><span role="img" aria-label="message">📧</span> Unread message: 7</span></li>
                                    <li><span className="dropdown-item custom-dropdown-item"><span role="img" aria-label="due">📅</span> Dues in the next week: 3</span></li>
                                    <li><Link className="dropdown-item custom-dropdown-item" to="/editProfile"><span role="img" aria-label="edit">🖊️</span> Edit Profile</Link></li>
                                    <li><Link className="dropdown-item custom-dropdown-item" to="/changePassword"><span role="img" aria-label="password">🔑</span> Change Password</Link></li>
                                </ul>

                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light custom-button" to="/exit">
                                    <span role="img" aria-label="exit">🚪</span> Log out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
