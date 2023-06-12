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
                        Heat Tools
                    </Link>

                    {/* <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/adminAccess">
                                    Admin Access Button
                                </Link>
                            </li>
                        </ul>
                    </div> */}


                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/login">
                                    <img src={avatarImage} alt="avatar" style={{ width: '100px', height: '100px', marginRight: '8px' }} />
                                    Lionel Messi
                                </Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </nav>

            {/* Side Navigation */}
            <div className="d-flex flex-column bg-dark" style={{ height: 'calc(100vh - 56px)', position: 'fixed', width: '200px' }}>
                <Link to="/timetable" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Assessment Time Table
                </Link>

                <Link to="/coursework" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Assessment Information
                </Link>

                <Link to="/grade" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Grade
                </Link>
                {/* <Link to="/duealert" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Due Alert(Deleted)
                </Link> */}


                {/* <Link to="/exam" className="flex-fill p-3 border-bottom  text-white text-decoration-none text-center">
                    Exam
                </Link> */}

                <Link to="/supporting" className="flex-fill p-3 border-bottom text-white text-decoration-none text-center">
                    Supporting
                </Link>
            </div>


            {/* Main Content */}
            <div style={{ marginLeft: '200px', paddingTop: '60px' }}>
                {/* This is where the main content will be rendered */}
            </div>
        </div>
    );
}
