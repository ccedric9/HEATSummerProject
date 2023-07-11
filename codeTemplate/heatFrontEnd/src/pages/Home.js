import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { Box,IconButton,Button, ButtonGroup,Typography,Grid} from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import shadows from "@mui/material/styles/shadows";

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
        event.type.toUpperCase() === "SUMMATIVE"
          ? '#CC313D'
          : event.type.toUpperCase() === "FORMATIVE"
            ? '#2C5F2D'
            : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
              ? '#8A307F'
              : "default-color"
    };
  };

  return (
    <div className="timeline-container">
      {/* Title and Navigation Buttons */}
      <Box display='grid' gridTemplateColumns="repeat(10, 1fr)" gap={2}  >
        <Typography gridColumn="span 4" variant = 'h6' text='textSecondary' align="left">
          Computer Science 
        </Typography>
        <Box display='flex' gridColumn="span 3" >
          <Button color="secondary" onClick={() => setCurrentYear(currentYear - 1)}>
            <NavigateBeforeIcon/>
          </Button>
          <Typography fontSize={18} p = {2}>{currentYear}~{currentYear + 1}</Typography>
          <Button color="secondary" onClick={() => setCurrentYear(currentYear + 1)}>
            <NavigateNextIcon />
          </Button>
        </Box>
        <Box gridColumn="span 3" align ='right'>
          <ButtonGroup variant="contained" aria-label="outlined primary button group" color='inherit'>
            <Button component = {Link} to='/'sx={{ color: 'black', backgroundColor: '#a0332c' }}>Year</Button>
            <Button component = {Link} to='/weeklyCalendar'sx={{ color: 'black', backgroundColor: '#a0332c' }}>Term</Button>
            <Button component = {Link} to='/CalendarByModule'sx={{ color: 'black', backgroundColor: '#a0332c'}}>Module</Button>
          </ButtonGroup>
        </Box>
      </Box>

      {/* Months */}

      <div className="months-container">
        {months.map((month, index) => (
        
            <div className="month" key={month} style={{flex: 1}}>
              {month}
              {index !== months.length && index !== 0 &&<div className="vertical-line"></div>}
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
            const unitHeight = 100;

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
