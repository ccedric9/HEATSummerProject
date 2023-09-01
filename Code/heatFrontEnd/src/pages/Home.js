import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

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
    const timelineStart = new Date(`${startDate.getFullYear() - 1}-09-01`);

    const durationDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

    const offsetDays =
      (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);

    return {
      left: `calc(${(offsetDays / 365) * 100}% + 10px)`,
      width: `calc(${(durationDays / 365) * 100}% - 20px)`,
      backgroundColor: event.type === "SUMMATIVE" ? "red" : "green",
    };
  };

  return (
    <div className="timeline-container">
      {/* Title */}
      <h1 className="title">Academic Calendar</h1>
      
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
