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
        // if (!eventsSet.has(result.data)){
        //     eventsSet.add(result.data);
        // }
        // console.log(eventsSet.keys());

    };

    const handleEventClick = (selectedEvent) => {
        // alert(`Event: ${event.unitName}`);
        alert(`Event: ${selectedEvent.unitName}`);
    };

    const getEventStyle = (event, index) => {

        const term = event.term;
        const credit = event.unitCredit;

        return {
            left: term === "1"||term==="3"? '0':'50%',
            width: term === "3"?'98%':'48%',
            height: credit === "10" ? '130%' : credit === "20" ? '150%' : credit === "30" ? '180%' : '180%',
            top:`${index*200}px`,
            backgroundColor: "lightcyan",
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
                        // style={{ ...getEventStyle(events, index)}}
                        style={getEventStyle(events.find(event => event.unitName === unitName),index)}
                        onClick={() => handleEventClick(events.find(event => event.unitName === unitName))}
                    >
                        <div className="test-names">
                            {events
                                .filter(event => event.unitName === unitName)
                                .map((event, subIndex) => (
                                    <div className="test-name"
                                         key={subIndex}
                                         style={{backgroundColor:event.type==="SUMMATIVE"?"red":event.type==="FORMATIVE"?"green":"purple"}}>{event.title}</div>
                                ))}
                        </div>
                        <div className="unit-codes">
                            {events
                                .filter(event => event.unitName === unitName)
                                .map((event, subIndex) => (
                                    <div className="unit-code">{event.unitCode}</div>
                                ))}
                        </div>
                        <div className="unit-name">{unitName}</div>

                    </div>
                ))}
            </div>
        </div>
    );
}