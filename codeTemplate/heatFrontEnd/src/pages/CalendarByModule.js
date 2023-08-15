import React, { useEffect, useState } from "react";
import "./CalendarByModule.css";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import { backgroundColor } from "react-native-calendars/src/style";
import { Box, Button, ButtonGroup, Icon, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Tooltip } from "@mui/material";
import EventDialog from "./EventDialog";
import { useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function CalendarByModule() {

    const user = useSelector(state => state.user);
    const isStaff = user.staff;
    const program = user.major;
    const location = useLocation();
    //user program will define here 
    // const program = 'Computer Science';

    const firstYear = 2022;

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [events, setEvents] = useState([]);
    // const eventsSet = new Set(); // create a new hashSet to store the unitName
    const [currentYear, setCurrentYear] = useState(firstYear);
    const [openDialog, setOpenDialog] = useState(false);
    
    useEffect(() => {
        loadCalendarEvents();
    }, []);

    const loadCalendarEvents = async () => {
        const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents`);

        setEvents(result.data);

    };

    const selectedEvents = events.filter((event)=> event.programName === program && event.academicYear === currentYear - firstYear + 1 );


    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setOpenDialog(true);
      };
    
    const handleCloseDialog = () => {
    setOpenDialog(false);
    };
      
    const handleEventHover = (event) => {
        setHoveredEvent(event);
    };
      

    const getEventStyle = (event, index) => {

        const term = event.term;
        const credit = event.unitCredit;

        return {
            width: term === 3 ? '195%' : '90%',
            height: credit < 20 ? '130px' : credit < 30 ? '150px' : credit < 40 ? '170px' : '200px',
            backgroundColor: '#F9F6EE',
        };

    };

    function getUnitNameClass(events) {
        const credit = events.unitCredit;
        if (credit === 10) {
            return "credit10";
        } else if (credit === 20) {
            return "credit20";
        } else {
            return "credit30plus";
        }
    }

    const [hoveredLinkedIds, setHoveredLinkedIds] = useState([]);

    const handleMouseEnter = (linkedId) => {
        setHoveredLinkedIds(linkedId || []);
    };

    const handleMouseLeave = () => {
        setHoveredLinkedIds([]);
    };

    return (
        <div className="timeline-container">
            {/* Title and Navigation Buttons */}
            <Box display='grid' gridTemplateColumns="repeat(10, 1fr)" gap={2}  >
                <Typography gridColumn="span 4" variant='h6' text='textSecondary' align="left">
                    Programme: {program}
                </Typography>
                <Box display='flex' gridColumn="span 3" >
                    <Button color="secondary" onClick={() => currentYear == firstYear ? setCurrentYear(currentYear +2):setCurrentYear(currentYear - 1)}>
                        <NavigateBeforeIcon />
                    </Button>
                    <div className="timelinebar-middle">
                        <div className="yearIndicator">Year {currentYear - firstYear + 1}</div>
                        <div>
                        {currentYear} - {currentYear + 1}
                        </div>
                    </div>
                    <Button id="nextYear-btn" color="secondary" onClick={() => currentYear == firstYear + 2 ? setCurrentYear(firstYear):setCurrentYear(currentYear + 1)}>
                        <NavigateNextIcon />
                    </Button>
                </Box>
                <Box gridColumn="span 3" align='right'>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='inherit'>
                        <Button
                            component={Link}
                            to="/home"
                            sx={{ color: "white", backgroundColor: location.pathname === '/home' ? "#3498db" : "#a0332c" }}
                        >
                            Year
                        </Button>
                        <Button
                            component={Link}
                            to="/weeklyCalendar"
                            sx={{ color: "white", backgroundColor: location.pathname === '/weeklyCalendar' ? "#3498db" : "#a0332c" }}
                        >
                            Term
                        </Button>
                        <Button
                            component={Link}
                            to="/CalendarByModule"
                            sx={{ color: "white", backgroundColor: location.pathname === '/CalendarByModule' ? "#3498db" : "#a0332c" }}
                        >
                            Module
                        </Button>
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
                        const filteredEvents = selectedEvents.filter(event => event.unitName === unitName && event.term === 1);
                        if (filteredEvents.length === 0) return null;

                        return (
                            <div
                                className={getUnitNameClass(filteredEvents[0])}
                                key={index}
                                style={getEventStyle(filteredEvents[0], index)}
                                // onClick={() => handleEventClick(filteredEvents[0])}
                            >
                                <div className="test-names">
                                    {filteredEvents.map((event, subIndex) => (
                                        <Tooltip
                                            title={
                                            <div>
                                                <Typography variant="subtitle1">{event.title}</Typography>
                                                <Typography variant="body2">Start Date: {event.start}</Typography>
                                                <Typography variant="body2">End Date: {event.end}</Typography>
                                                <Typography variant="body2">Year: {event.academicYear}</Typography>
                                                <Typography variant="body2">Term: {event.term}</Typography>
                                                <Typography variant="body2">Type: {event.type}</Typography>
                                                {event.feedback ? (
                                                <Typography variant="body2">FeedBack: ✅</Typography>
                                                ) : (
                                                // If no feedback, display the wrong emoji
                                                <Typography variant="body2">FeedBack: Not Available</Typography>
                                                )}
                                                {event.location && (
                                                    <Typography variant="body2">Location: {event.location}</Typography>
                                                )}
                                            </div>
                                            }
                                            key={subIndex}
                                            onClick={() => handleEventClick(event)}
                                            style={{
                                                border: '1px solid',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                transition: 'border 0.3s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.border = '5px solid #FBEF01';
                                                if (event.linkedIds!==null) handleMouseEnter(event.linkedIds);
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.border = '1px solid #ccc';    // Border style when not hovered
                                                handleMouseLeave();
                                            }}
                                      >
                                            <div
                                                className="test-name"
                                                key={subIndex}
                                                style={{
                                                    backgroundColor:
                                                        event.type.toUpperCase() === "SUMMATIVE"
                                                            ? "#C05555"
                                                            : event.type.toUpperCase() === "FORMATIVE"
                                                                ? "#59886B"
                                                                : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                                                                    ? "#6C5070"
                                                                    : "default-color",
                                                    color: 'white',
                                                    borderRadius: '5px',
                                                    border: `${
                                                        hoveredLinkedIds.includes(event.id) ? '5px solid #FBEF01' : '1px solid #ccc'
                                                    }`,
                                                }}
                                            >
                                                <div className="text-name-p" >{event.title}</div>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                                <div className="unit-codes">{filteredEvents[0].unitCode}</div>
                                <div className="unit-name">{unitName}</div>
                                <div className="unit-credit">{filteredEvents[0].unitCredit}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="module-parent-right">
                    {Array.from(new Set(events.map(event => event.unitName))).map((unitName, index) => {
                        const filteredEvents = selectedEvents.filter(event => event.unitName === unitName && event.term === 2);
                        if (filteredEvents.length === 0) return null;

                        return (
                            <div
                                className={`${getUnitNameClass(filteredEvents[0])}`}
                                key={index}
                                style={getEventStyle(filteredEvents[0], index)}
                                // onClick={() => handleEventClick(filteredEvents[0])}
                            >
                                <div className="test-names">
                                    {filteredEvents.map((event, subIndex) => (
                                        <Tooltip
                                            title={
                                            <div>
                                                <Typography variant="subtitle1">{event.title}</Typography>
                                                <Typography variant="body2">Start Date: {event.start}</Typography>
                                                <Typography variant="body2">End Date: {event.end}</Typography>
                                                <Typography variant="body2">Year: {event.academicYear}</Typography>
                                                <Typography variant="body2">Term: {event.term}</Typography>
                                                <Typography variant="body2">Type: {event.type}</Typography>
                                                {event.feedback ? (
                                                <Typography variant="body2">FeedBack: ✅</Typography>
                                                ) : (
                                                // If no feedback, display the wrong emoji
                                                <Typography variant="body2">FeedBack: Not Available</Typography>
                                                )}
                                                {event.location && (
                                                    <Typography variant="body2">Location: {event.location}</Typography>
                                                )}
                                            </div>
                                            }
                                            key={subIndex}
                                            onClick={() => handleEventClick(event)}
                                            style={{
                                                border: '1px solid',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                transition: 'border 0.3s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.border = '5px solid #FBEF01';
                                                if (event.linkedIds!==null) handleMouseEnter(event.linkedIds);
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.border = '1px solid #ccc';    // Border style when not hovered
                                                handleMouseLeave();
                                            }}
                                        >
                                            <div
                                                className="test-name"
                                                key={subIndex}
                                                style={{
                                                    backgroundColor:
                                                        event.type.toUpperCase() === "SUMMATIVE"
                                                            ? "#C05555"
                                                            : event.type.toUpperCase() === "FORMATIVE"
                                                                ? "#59886B"
                                                                : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                                                                    ? "#6C5070"
                                                                    : "default-color",
                                                    color: 'white',
                                                    borderRadius: '5px',
                                                    border: `${
                                                        hoveredLinkedIds.includes(event.id) ? '5px solid #FBEF01' : '1px solid #ccc'
                                                    }`,
                                                }}
                                            >
                                                <div className="text-name-p">{event.title}</div>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                                <div className="unit-codes">{filteredEvents[0].unitCode}</div>
                                <div className="unit-name">{unitName}</div>
                                <div className="unit-credit">{filteredEvents[0].unitCredit}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="module-parent-bottom">
                    {Array.from(new Set(events.map(event => event.unitName))).map((unitName, index) => {
                        const filteredEvents = selectedEvents.filter(event => event.unitName === unitName && event.term === 3);
                        if (filteredEvents.length === 0) return null;

                        return (
                            <div
                                className={`${getUnitNameClass(filteredEvents[0])}`}
                                key={index}
                                style={getEventStyle(filteredEvents[0], index)}
                                // onClick={() => handleEventClick(filteredEvents[0])}
                            >
                                <div className="test-names">
                                    {filteredEvents.map((event, subIndex) => (
                                        <Tooltip
                                            title={
                                            <div>
                                                <Typography variant="subtitle1">{event.title}</Typography>
                                                <Typography variant="body2">Start Date: {event.start}</Typography>
                                                <Typography variant="body2">End Date: {event.end}</Typography>
                                                <Typography variant="body2">Year: {event.academicYear}</Typography>
                                                <Typography variant="body2">Term: {event.term}</Typography>
                                                <Typography variant="body2">Type: {event.type}</Typography>
                                                {event.feedback ? (
                                                <Typography variant="body2">FeedBack: ✅</Typography>
                                                ) : (
                                                // If no feedback, display the wrong emoji
                                                <Typography variant="body2">FeedBack: Not Available</Typography>
                                                )}
                                                {event.location && (
                                                    <Typography variant="body2">Location: {event.location}</Typography>
                                                )}
                                            </div>
                                            }
                                            key={subIndex}
                                            onClick={() => handleEventClick(event)}
                                            style={{
                                                border: '5px solid',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                transition: 'border 0.3s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.border = '5px solid #FBEF01';
                                                if (event.linkedIds!==null) handleMouseEnter(event.linkedIds);
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.border = '1px solid #ccc';    // Border style when not hovered
                                                handleMouseLeave();
                                            }}
                                        >
                                            <div
                                                className="test-name"
                                                key={subIndex}
                                                style={{
                                                    backgroundColor:
                                                        event.type.toUpperCase() === "SUMMATIVE"
                                                            ? "#C05555"
                                                            : event.type.toUpperCase() === "FORMATIVE"
                                                                ? "#59886B"
                                                                : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                                                                    ? "#6C5070"
                                                                    : "default-color",
                                                    color: 'white',
                                                    borderRadius: '5px',
                                                    border: `${
                                                        hoveredLinkedIds.includes(event.id) ? '5px solid #FBEF01' : '1px solid #ccc'
                                                    }`,
                                                }}
                                            >
                                                <div className="text-name-p" >{event.title}</div>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                                <div className="unit-codes">{filteredEvents[0].unitCode}</div>
                                <div className="unit-name">{unitName}</div>
                                <div className="unit-credit">{filteredEvents[0].unitCredit}</div>
                            </div>
                        );
                    })}
                </div>
            <EventDialog open={openDialog} handleCloseDialog={handleCloseDialog} event={selectedEvent} />
            </div>


        </div>
    );
}