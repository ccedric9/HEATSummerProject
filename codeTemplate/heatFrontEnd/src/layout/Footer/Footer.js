import React from 'react'
import './Footer.css';
import {Link, useLocation} from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="footer">
        <div className="top">
            <div className="contact">
                <h5>Contact</h5>
                <div className="item">Queens Building, Bristol,BS8 1TR, UK</div>
                <div className="item">Tel: +44 (0)117 928 9000</div>
                <div className="item">Email: admin@bristol.ac.uk</div>
            </div>
            {/* <div className="calendar">
                <h5>Calendar</h5>
                {!isHomePage ? (
                    <div className="footer-valid" id = 'footer-year'>
                        <Link className="item" to='/'>
                            By Year
                        </Link>
                        <Link className="item" to='/weeklyCalendar' >
                            By Term
                        </Link>
                        <Link className="item" to='calendarByModule' >
                            By Module
                        </Link>
                    </div>
                ) : (
                    <div class="footer-valid">
                        <span className="item disabled">
                            By Year
                        </span>
                        <span className="item" to='/weeklyCalendar' >
                            By Term
                        </span>
                        <span className="item" to='calendarByModule'>
                            By Module
                        </span>
                    </div>
                )}
            </div> */}
            <div className="tools">
                <h5>Tools</h5>
                <a href="https://www.ole.bris.ac.uk/" className="item">Blackboard</a>
                <a href="https://www.bris.ac.uk/syllabus-plus/" className="item">Timetable</a>
                <a href="https://evision.apps.bristol.ac.uk/" className="item">eVision</a>
                {/* <a href="https://www.bristol.ac.uk/help/" className="item">Help</a> */}
            </div>
        </div>
        <div className="bottom">
            <span className="copyright">@2023 Faculty of Engineering, University of Bristol</span>
            <a href="https://www.bristol.ac.uk/style-guides/web/policies/legal/terms/">Terms and Conditions</a>
            <a href="https://www.bristol.ac.uk/style-guides/web/policies/legal/privacy/">Privacy and Cookies</a>
        </div>
    </div>
  )
}

export default Footer