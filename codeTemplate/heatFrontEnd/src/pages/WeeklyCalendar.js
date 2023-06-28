// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const WeeklyCalendar = () => {
    const weeks = Array.from({ length: 26 }, (_, index) => index + 1);


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

    const getEventWeekStyle = (event) => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
    
      // Fixed timeline start date
      const timelineStart = new Date('2022-09-01');
    
      // Calculate the number of weeks between the event start and end
      const durationWeeks = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7) + 1;
    
      // Calculate the number of weeks between the start of the timeline and the start of the event
      const offsetWeeks = (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24 * 7);
    
      return {
        left: `calc(${(offsetWeeks / 26) * 100}% + 10px)`, // Adjust 26 to the desired total number of weeks
        width: `calc(${(durationWeeks / 26) * 100}% - 20px)`, // Adjust 26 to the desired total number of weeks
        backgroundColor: event.type === "SUMMATIVE" ? "red" : "green",
      };
    };
    


  return (
    // JSX for the weekly calendar page
    // <div>
    //   {/* <h2>Weekly Calendar</h2> */}
    //   {/* <h1>aaaaaaaa</h1> */}
    // </div>
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
    
    {/* Weeks */}
    {/* <div className="months-container">
      {weeks.map((week) => (
        <div className="month" key={week} style={{ flex: 1 }}>
          {week}
        </div>
      ))}
    </div> */}
    <div className="weeks-container">
      {weeks.map((week) => (
        <div className="week" key={week} style={{ flex: 1 }}>
          {week === 7 ? "AW1" : week === 8 ? "AW2" : week}
          {/* {week} */}
        </div>
      ))}
    </div>


    {/* Events */}
    <div className="events-container">
      {events.map((event, index) => (
        <div
          className="event"
          key={index}
          style={{ ...getEventWeekStyle(event), top: `${index * 30}px` }}
          onClick={() => handleEventClick(event)}
        >
          {event.title}
        </div>
      ))}
    </div>
  </div>
  );
};

export default WeeklyCalendar;
