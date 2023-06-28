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
  const [unitNameCounts, setUnitNameCounts] = useState({});

  const [currentYear, setCurrentYear] = useState(2022);


  useEffect(() => {
    loadCalendarEvents();
  }, []);

  const loadCalendarEvents = async () => {
    const result = await axios.get("http://localhost:8080/calendarEvents");
    setEvents(result.data);

    //Caculate the number of each unit name
    const counts = {};
    result.data.forEach((event) => {
      const { unitName } = event;
      counts[unitName] = counts[unitName] ? counts[unitName] + 1 : 1;
    });
    setUnitNameCounts(counts);
  };

  const handleEventClick = (event) => {
    alert(`Event: ${event.title}`);
  };

  const getEventStyle = (event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    // Fixed timeline start date
    const timelineStart = new Date("2022-09-01");

    // Calculate the number of days between the event start and end
    const durationDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

    // Calculate the number of days between the start of the timeline and the start of the event
    const offsetDays =
      (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);

    return {
      left: `calc(${(offsetDays / 365) * 100}% + 10px)`,
      width: `calc(${(durationDays / 365) * 100}% - 20px)`,
      backgroundColor:
        event.type === "SUMMATIVE"
          ? "red"
          : event.type === "FORMATIVE"
            ? "green"
            : event.type === "CAPSTONESUMMATIVE"
              ? "purple"
              : "default-color",
    };
  };

  return (
    <div className="timeline-container">
      {/* Title and Navigation Buttons */}
      <div className="header-container">
        <h1 className="title">Computer Science</h1>
        <div className="year-selector">
          <button onClick={() => setCurrentYear(currentYear - 1)}>{"<"}</button>
          <span>{currentYear}~{currentYear + 1}</span>
          <button onClick={() => setCurrentYear(currentYear + 1)}>{">"}</button>
        </div>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">
            By Year
          </Link>
          <Link to="/weeklyCalendar" className="nav-button">
            By Term
          </Link>
          <Link to="/calendarByModule" className="nav-button">
            By Module
          </Link>
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
        <div className="unitNames-container">
          {events.map((event, index) => {
            const isSameUnit =
              index > 0 && events[index - 1].unitName === event.unitName;
            const unitName = isSameUnit ? "" : event.unitName;
            const occurrenceCount = unitNameCounts[event.unitName] || 0;
            const unitHeight = occurrenceCount * 30;

            return (
              <React.Fragment key={index}>
                {isSameUnit && (
                  <div className="unitName-placeholder" style={{ height: "30px" }}></div>
                )}
                {!isSameUnit && (
                  <div
                    className="unitName"
                    style={{ height: `${unitHeight}px`, top: `${index * 30}px`, }}
                  >
                    {unitName}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        {events.map((event, index) => (
          <div
            className="event"
            key={index}
            style={{
              ...getEventStyle(event),
              top: `${index * 30}px`,
            }}
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
