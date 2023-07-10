import React, {useEffect, useState} from "react";
import "./CalendarByModule.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {backgroundColor} from "react-native-calendars/src/style";

export default function CalendarByModule(){
    const [events, setEvents] = useState([]);
    // const eventsSet = new Set(); // create a new hashSet to store the unitName
    const [currentYear, setCurrentYear] = useState(2022);

    useEffect(() => {
        loadCalendarEvents();
    }, []);

    const loadCalendarEvents = async () => {
        const result = await axios.get("http://localhost:8080/calendarEvents");
        setEvents(result.data);

    };

    const handleEventClick = (selectedEvent) => {
        // alert(`Event: ${event.unitName}`);
        alert(`Event: ${selectedEvent.unitName}`);
    };

    const getEventStyle = (event, index) => {

        const term = event.term;
        const credit = event.unitCredit;

        return {
            width: term === "3"?'195%':'90%',
            height: credit === "10" ? '150px' : credit === "20" ? '200px' : '250px',
            backgroundColor: "lightcyan",
        };

    };

    function getUnitNameClass(events){
        const credit = events.unitCredit;
        if (credit==="10"){
            return "credit10";
        } else if (credit==="20"){
            return "credit20";
        } else {
            return "credit30plus";
        }
    }

    return (
        <div className="timeline-container-module">
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
            <div className="timeline-title">
                <h6 class="text-subheader-left">TB1</h6>
                <div class="bottom-part-left">
                    <div class="line"></div>
                    <i class="arrow"></i>
                </div>
                <h6 class="text-subheader-right">TB2</h6>
                <div class="bottom-part-right">
                    <div class="line"></div>
                    <i class="arrow"></i>
                </div>
            </div>

            <div className="module-parent">
                <div className="module-parent-left">
                    {Array.from(new Set(events.map(event => event.unitName))).map((unitName, index) => {
                        const filteredEvents = events.filter(event => event.unitName === unitName && event.term === "1");
                        if (filteredEvents.length === 0) return null;

                        return (
                            <div
                                className={getUnitNameClass(filteredEvents[0])}
                                key={index}
                                style={getEventStyle(filteredEvents[0], index)}
                                onClick={() => handleEventClick(filteredEvents[0])}
                            >
                                <div className="test-names">
                                    {filteredEvents.map((event, subIndex) => (
                                        <div
                                            className="test-name"
                                            key={subIndex}
                                            style={{ backgroundColor: event.type === "SUMMATIVE" ? "red" : event.type === "FORMATIVE" ? "green" : "purple" }}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                                <div className="unit-codes">{filteredEvents[0].unitCode}</div>
                                <div className="unit-name">{unitName}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="module-parent-right">
                    {Array.from(new Set(events.map(event => event.unitName))).map((unitName, index) => {
                        const filteredEvents = events.filter(event => event.unitName === unitName && event.term === "2");
                        if (filteredEvents.length === 0) return null;

                        return (
                            <div
                                className={`${getUnitNameClass(filteredEvents[0])}`}
                                key={index}
                                style={getEventStyle(filteredEvents[0], index)}
                                onClick={() => handleEventClick(filteredEvents[0])}
                            >
                                <div className="test-names">
                                    {filteredEvents.map((event, subIndex) => (
                                        <div
                                            className="test-name"
                                            key={subIndex}
                                            style={{ backgroundColor: event.type === "SUMMATIVE" ? "red" : event.type === "FORMATIVE" ? "green" : "purple" }}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                                <div className="unit-codes">{filteredEvents[0].unitCode}</div>
                                <div className="unit-name">{unitName}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="module-parent-bottom">
                    {Array.from(new Set(events.map(event => event.unitName))).map((unitName, index) => {
                        const filteredEvents = events.filter(event => event.unitName === unitName && event.term === "3");
                        if (filteredEvents.length === 0) return null;

                        return (
                            <div
                                className={`${getUnitNameClass(filteredEvents[0])}`}
                                key={index}
                                style={getEventStyle(filteredEvents[0], index)}
                                onClick={() => handleEventClick(filteredEvents[0])}
                            >
                                <div className="test-names">
                                    {filteredEvents.map((event, subIndex) => (
                                        <div
                                            className="test-name"
                                            key={subIndex}
                                            style={{ backgroundColor: event.type === "SUMMATIVE" ? "red" : event.type === "FORMATIVE" ? "green" : "purple" }}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                                <div className="unit-codes">{filteredEvents[0].unitCode}</div>
                                <div className="unit-name">{unitName}</div>
                            </div>
                        );
                    })}
                </div>
            </div>



        </div>
    );
}