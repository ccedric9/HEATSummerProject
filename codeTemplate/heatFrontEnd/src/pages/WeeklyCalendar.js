// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const WeeklyCalendar = () => {
    const weeks = Array.from({ length: 13 }, (_, index) => index + 1);


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

    // const getEventStyle = (event) => {
    //   const startDate = new Date(event.start);
    //   const endDate = new Date(event.end);
      
    //   // Fixed timeline start date
    //   const timelineStart = new Date('2022-09-01');
      
    //   // Calculate the number of days between the event start and end
    //   const durationDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      
    //   // Calculate the number of days between the start of the timeline and the start of the event
    //   const offsetDays = (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);
    
    //   return {
    //       left: `calc(${(offsetDays / 365) * 100}%UMM + 10px)`,
    //       width: `calc(${(durationDays / 365) * 100}% - 20px)`,
    //       backgroundColor: event.type === 'SUMMATIVE' ? 'red' : event.type ==='FORMATIVE' ? 'green' : event.type ==='CapstoneSummative'? 'yellow': 'default-color',
    //   };
    // };

    const getEventWeekStyle = (event) => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
    
      // Fixed timeline start date
      const timelineStart = new Date('2022-09-15');
    
      // Calculate the number of weeks between the event start and end
      const durationWeeks = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 *7) + 1;
    
      // Calculate the number of weeks between the start of the timeline and the start of the event
      const offsetWeeks = (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24 *7);
    
      return {
        left: `calc(${(offsetWeeks / 20) * 100}% + 10px)`, // 20 does not make sense , just for visual demostration
        width: `calc(${(durationWeeks / 20) * 100}% - 20px)`, // 20 does not make sense , just for visual demostration
        backgroundColor: event.type === 'SUMMATIVE' ? 'red' : event.type ==='FORMATIVE' ? 'green' : event.type ==='CapstoneSummative'? 'purple': 'default-color',
      };
    };
    
      // Sort events by unit name
      const sortedEvents = events.sort((a, b) => {
        if (a.unitName < b.unitName) {
          return -1;
        }
        if (a.unitName > b.unitName) {
          return 1;
        }
        return 0;
      });

      const filteredEvents = events.filter(event =>{

        return event.unitName === 'Intro to Computer Science' || event.unitName === 'Computer Architecture'  || event.unitName ==='Programming in C'
      });
    

      const groupedEvents = filteredEvents.reduce((acc, event) => {
        if (!acc[event.unitName]) {
          acc[event.unitName] = [];
        }
        acc[event.unitName].push(event);
        return acc;
      }, {});

  return (
    <div className="timeline-container">
    {/* Title and Navigation Buttons */}
      <div className="header-container">
        <h1 className="title">Academic Calendar</h1>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">By Year</Link>
          <Link to="/weeklyCalendar" className="nav-button">By Term</Link>
          <Link to="/calendarByModule" className="nav-button">By Module</Link>
        </div>
      </div>
  
      <div className="weeks-container" style={{marginLeft:'150px'}}>
        {weeks.map((week) => (
          <div className="week" key={week} style={{ flex: 1 }}>
            {week === 7 ? "AW" : week === 6 ? "RW" : week === 10 ? "CW1" :week ===11 ? "CW2" : week ===12 ? "AW":week}
          </div>
        ))}
      </div>

      <div>
      {Object.entries(groupedEvents).map(([unitName, unitEvents]) => (
        <div key={unitName}>
          <h6>{unitName}</h6>
        </div>
      ))}
    </div>

      <div className="events-container">
        {filteredEvents.map((event, index) => (
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
