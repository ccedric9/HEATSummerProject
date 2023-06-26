import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const months = [
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadCalendarEvents();
  }, []);

  const loadCalendarEvents = async () => {
    const result = await axios.get("http://localhost:8080/calendarEvents");
    setEvents(result.data);
  };

  const handleEventClick = (event) => {
    alert(`Event: ${event.title}`);
  };

  const getEventStyle = (event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    
    // Fixed timeline start date
    const timelineStart = new Date('2022-09-01');
  
    // Calculate the number of days between the event start and end
    const durationDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  
    // Calculate the number of days between the start of the timeline and the start of the event
    const offsetDays = (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);
  
    return {
      left: `calc(${(offsetDays / 365) * 100}% + 10px)`,
      width: `calc(${(durationDays / 365) * 100}% - 20px)`,
      backgroundColor: event.type === "SUMMATIVE" ? "red" : "green",
    };
  };
  

  return (
    <div className="timeline-container">
      {/* Title and Navigation Buttons */}
      <div className="header-container">
        <h1 className="title">Academic Calendar</h1>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">Yearly</Link>
          <Link to="/weeklyCalendar" className="nav-button">Weekly</Link>
          <Link to="/calendarByModule" className="nav-button">By Module</Link>
        </div>
      </div>
      
      {/* Months */}
      <div className="months-container">
        {months.map((month) => (
          <div className="month" key={month} style={{ flex: 1 }}>
            {month}
          </div>
        ))}
      </div>

      {/* Events */}
      <div className="events-container">
        {events.map((event, index) => (
          <div
            className="event"
            key={index}
            style={{ ...getEventStyle(event), top: `${index * 30}px` }}
            onClick={() => handleEventClick(event)}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
