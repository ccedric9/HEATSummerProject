import React from 'react';
import { Link } from 'react-router-dom';
import avatarImage from '../photos/messi.png';

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
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="assessTimeTable" role="button" data-bs-toggle="dropdown">
                                    Assessment Time Table
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="assessTimeTable">
                                    <Link className="dropdown-item" to="/time-table/option1">Option 1</Link>
                                    <Link className="dropdown-item" to="/time-table/option2">Option 2</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="assessInfo" role="button" data-bs-toggle="dropdown">
                                    Assessment Information
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="assessInfo">
                                    <Link className="dropdown-item" to="/info/option1">Option 1</Link>
                                    <Link className="dropdown-item" to="/info/option2">Option 2</Link>
                                </div>
                            </li>
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
                            <li>
                                <Link className="btn btn-outline-light" to="termchart">
                                    TermChart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/login">
                                    {/* <img src={avatarImage} alt="avatar" style={{ width: '100px', height: '100px', marginRight: '8px' }} /> */}
                                    👤Lionel Messi ⚙️
                                </Link>
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
