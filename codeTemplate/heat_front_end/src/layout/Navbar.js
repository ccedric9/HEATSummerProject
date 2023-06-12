import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            {/* Top Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Heat Tools
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/adminAccess">
                                    Admin Access Button
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/login">
                                    Log In
                                </Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </nav>

            {/* Side Navigation */}
            <div className="d-flex flex-column bg-dark" style={{ height: 'calc(100vh - 56px)', position: 'fixed', width: '200px' }}>
                <Link to="/timetable" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Time Table
                </Link>
                <Link to="/grade" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Grade
                </Link>
                <Link to="/duealert" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Due Alert
                </Link>
                <Link to="/supporting" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Supporting
                </Link>
                <Link to="/coursework" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Coursework
                </Link>
                <Link to="/exam" className="flex-fill p-3 text-white text-decoration-none text-center">
                    Exam
                </Link>
            </div>


            {/* Main Content */}
            <div style={{ marginLeft: '200px', paddingTop: '60px' }}>
                {/* This is where the main content will be rendered */}
            </div>
        </div>
    );
}
