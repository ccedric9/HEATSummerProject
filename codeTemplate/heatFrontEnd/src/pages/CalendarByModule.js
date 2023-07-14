import React, { useEffect, useState } from "react";
import "./CalendarByModule.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { backgroundColor } from "react-native-calendars/src/style";
import { Box, Button, ButtonGroup, Icon, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function CalendarByModule() {
    const [events, setEvents] = useState([]);
    // const eventsSet = new Set(); // create a new hashSet to store the unitName
    const [currentYear, setCurrentYear] = useState(2022);

    useEffect(() => {
        loadCalendarEvents();
    }, []);

    const loadCalendarEvents = async () => {
        const result = await axios.get(`/calendarEvents`);

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
            width: term === "3" ? '195%' : '90%',
            height: credit < "20" ? '130px' : credit < "30" ? '150px' : credit < '40' ? '170px' : '200px',
            backgroundColor: '#F9F6EE',
        };

    };

    function getUnitNameClass(events) {
        const credit = events.unitCredit;
        if (credit === "10") {
            return "credit10";
        } else if (credit === "20") {
            return "credit20";
        } else {
            return "credit30plus";
        }
    }

    return (
        <div className="timeline-container-module">
            {/* Title and Navigation Buttons */}
            <Box display='grid' gridTemplateColumns="repeat(10, 1fr)" gap={2}  >
                <Typography gridColumn="span 4" variant='h6' text='textSecondary' align="left">
                    Computer Science
                </Typography>
                <Box display='flex' gridColumn="span 3" >
                    <Button color="secondary" onClick={() => setCurrentYear(currentYear - 1)}>
                        <NavigateBeforeIcon />
                    </Button>
                    <Typography fontSize={18} p={2}>{currentYear}~{currentYear + 1}</Typography>
                    <Button color="secondary" onClick={() => setCurrentYear(currentYear + 1)}>
                        <NavigateNextIcon />
                    </Button>
                </Box>
                <Box gridColumn="span 3" align='right'>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='inherit'>
                        <Button component={Link} to='/' sx={{ color: 'black', backgroundColor: '#a0332c' }}>Year</Button>
                        <Button component={Link} to='/weeklyCalendar' sx={{ color: 'black', backgroundColor: '#a0332c' }}>Term</Button>
                        <Button component={Link} to='/CalendarByModule' sx={{ color: 'black', backgroundColor: '#a0332c' }}>Module</Button>
                    </ButtonGroup>
                </Box>
            </Box>
            <div className="timeline-title">
                <div className="timeline-content">
                    <h6 class="text-subheader">TB1</h6>
                </div>
                <div className="timeline-content">
                    <h6 class="text-subheader">TB2</h6>
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
                                            style={{
                                                backgroundColor: event.type.toUpperCase() === "SUMMATIVE"
                                                    ? '#CC313D'
                                                    : event.type.toUpperCase() === "FORMATIVE"
                                                    ? '#2C5F2D'
                                                    : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                                                    ? '#8A307F'
                                                    : "default-color",
                                                color: 'white',
                                                borderRadius: '5px'
                                            }}
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
                                            style={{
                                                backgroundColor: event.type.toUpperCase() === "SUMMATIVE"
                                                ? '#CC313D'
                                                : event.type.toUpperCase() === "FORMATIVE"
                                                ? '#2C5F2D'
                                                : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                                                ? '#8A307F'
                                                : "default-color",
                                                color: 'white',
                                                borderRadius: '5px'

                                            }}
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
                                            style={{
                                                backgroundColor: event.type.toUpperCase() === "SUMMATIVE"
                                                ? '#CC313D'
                                                : event.type.toUpperCase() === "FORMATIVE"
                                                ? '#2C5F2D'
                                                : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                                                ? '#8A307F'
                                                : "default-color",
                                                color: 'white',
                                                borderRadius: '5px'

                                            }}
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