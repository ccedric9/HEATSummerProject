import React, {useEffect, useState} from "react";
import "./CalendarByModule.css";
import {Link} from "react-router-dom";
import axios from "axios";

export default function CalendarByModule(){
    const [events, setEvents] = useState([]);
    // const eventsSet = new Set(); // create a new hashSet to store the unitName

    useEffect(() => {
        loadCalendarEvents();
    }, []);

    const loadCalendarEvents = async () => {
        const result = await axios.get("http://localhost:8080/calendarEvents");
        setEvents(result.data);
        // if (!eventsSet.has(result.data)){
        //     eventsSet.add(result.data);
        // }
        // console.log(eventsSet.keys());

    };

    const handleEventClick = (event) => {
        alert(`Event: ${event.unitName}`);
    };

    const getEventStyle = (event, index) => {

        const credit = event.unitCredit;
        const term = event.term;

        return {
            left: term === 1 ? '0%' : '50%',
            width: '48%',
            height: credit === "20" ? '40%' : credit === "30" ? '60%' : credit === "40" ? '80%' : '150%',
            top:`${index*200}px`,
            backgroundColor:'white',
        };

    };
    const groupedEvents = {};

    return (
        <div className="timeline-container">
            {/* Title and Navigation Buttons */}
            <div className="header-container">
                <h1 className="title">Computer Science Year 1 </h1>
                <div className="nav-buttons">
                    <Link to="/" className="nav-button">By Year</Link>
                    <Link to="/weeklyCalendar" className="nav-button">By Week</Link>
                    <Link to="/calendarByModule" className="nav-button">By Module</Link>
                </div>
            </div>
            <div className="timeline-title">
                <h3 class="timeline-header">Year</h3>
                <div class="bottom-part">
                    <div class="line"></div>
                    <i class="arrow"></i>
                </div>
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

            <div className="events-container">
                {Array.from(new Set(events.map(event => event.unitName))).map((unitName, index) => (
                    <div
                        className="event"
                        key={index}
                        style={{ ...getEventStyle(events, index)}}
                        onClick={() => handleEventClick(events.find(event => event.unitName === unitName))}
                    >
                        <div className="test-names">
                            {events
                                .filter(event => event.unitName === unitName)
                                .map((event, subIndex) => (
                                    <div className="test-name" key={subIndex}>{event.title}</div>
                                ))}
                        </div>
                        <div className="unit-name">{unitName}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}