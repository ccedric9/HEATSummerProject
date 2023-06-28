// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const WeeklyCalendar = () => {
    const weeks = Array.from({ length: 13 }, (_, index) => index + 1);
    const [unitNameCounts, setUnitNameCounts] = useState({});
    const [currentYear, setCurrentYear] = useState(2022);
    const [currentTerm, setCurrentTerm] = useState("TB1");
    const [events, setEvents] = useState([]);

    useEffect(() => {
    loadCalendarEvents();
    }, []);

    const loadCalendarEvents = async () => {
      const result = await axios.get("http://localhost:8080/calendarEvents");
      const filteredEvents = result.data.filter((event) => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const startDateRange = new Date("2022-09-15");
        const endDateRange = new Date("2023-01-30");
        return (
          //use this code in the future
          // event.term === "TB1" &&
          startDate >= startDateRange &&
          endDate <= endDateRange
        );
      });
      setEvents(filteredEvents);
    
      // Calculate the number of each unit name
      const counts = {};
      filteredEvents.forEach((event) => {
        const { unitName } = event;
        counts[unitName] = counts[unitName] ? counts[unitName] + 1 : 1;
      });
      setUnitNameCounts(counts);
    };
    

    const handleEventClick = (event) => {
    alert(`Event: ${event.title}`);
    };

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
        // backgroundColor: event.type === 'SUMMATIVE' ? 'red' : event.type ==='FORMATIVE' ? 'green' : event.type ==='CAPSTONESUMMATIVE'? 'purple': 'default-color',
        backgroundColor:
        event.type.toUpperCase() === "SUMMATIVE"
          ? "red"
          : event.type.toUpperCase() === "FORMATIVE"
            ? "green"
            : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
              ? "purple"
              : "default-color",
      };
    };
    
    const handleNextButtonClick = () => {
      const currentTermIndex = ["TB1", "TB2", "TB3"].indexOf(currentTerm);
      const nextTermIndex = (currentTermIndex + 1) % 3;
      const isNextYear = nextTermIndex === 0;
    
      if (isNextYear) {
        setCurrentYear((prevYear) => prevYear + 1);
      }
    
      setCurrentTerm(["TB1", "TB2", "TB3"][nextTermIndex]);
    };
    
    const handlePrevButtonClick = () => {
      const currentTermIndex = ["TB1", "TB2", "TB3"].indexOf(currentTerm);
      const prevTermIndex = (currentTermIndex - 1 + 3) % 3;
      const isPrevYear = prevTermIndex === 2;
    
      if (isPrevYear) {
        setCurrentYear((prevYear) => prevYear - 1);
      }
    
      setCurrentTerm(["TB1", "TB2", "TB3"][prevTermIndex]);
    };
    
      // Sort events by unit name
      // const sortedEvents = events.sort((a, b) => {
      //   if (a.unitName < b.unitName) {
      //     return -1;
      //   }
      //   if (a.unitName > b.unitName) {
      //     return 1;
      //   }
      //   return 0;
      // });

      // const filteredEvents = events.filter(event =>{

      //   return event.unitName === 'Intro to Computer Science' || event.unitName === 'Computer Architecture'  || event.unitName ==='Programming in C'
      // });
    

      // const groupedEvents = filteredEvents.reduce((acc, event) => {
      //   if (!acc[event.unitName]) {
      //     acc[event.unitName] = [];
      //   }
      //   acc[event.unitName].push(event);
      //   return acc;
      // }, {});

  return (
    <div className="timeline-container">
    {/* Title and Navigation Buttons */}
      <div className="header-container">
        <h1 className="title">Computer Science</h1>
        <div className="year-selector">
          <button onClick={handlePrevButtonClick}>{"<"}</button>
          <span>{`${currentYear}-${currentYear + 1} ${currentTerm}`}</span>
          <button onClick={handleNextButtonClick}>{">"}</button>
        </div>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">By Year</Link>
          <Link to="/weeklyCalendar" className="nav-button">By Term</Link>
          <Link to="/calendarByModule" className="nav-button">By Module</Link>
        </div>
      </div>
  
      {/* <div className="weeks-container" style={{marginLeft:'150px'}}> */}
      <div className="weeks-container" >
        {weeks.map((week) => (
          <div className="week" key={week} style={{ flex: 1 }}>
            {week === 7 ? "AW" : week === 6 ? "RW" : week === 10 ? "CW1" :week ===11 ? "CW2" : week ===12 ? "AW":week}
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
              ...getEventWeekStyle(event),
              top: `${index * 30}px`,
            }}
            onClick={() => handleEventClick(event)}
          >
            {event.title}
          </div>
        ))}
      </div>
      {/* <div className="events-container">
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
      </div> */}
  </div>
  );
};

export default WeeklyCalendar;
