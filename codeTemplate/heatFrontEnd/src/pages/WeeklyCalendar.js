// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, Icon, Typography, Tooltip } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EventDialog from "./EventDialog";

const WeeklyCalendar = () => {
  const weeks = Array.from({ length: 13 }, (_, index) => index + 1);
  const [unitNameCounts, setUnitNameCounts] = useState({});
  const [currentYear, setCurrentYear] = useState(2022);
  const [currentTerm, setCurrentTerm] = useState("TB1");
  const [events, setEvents] = useState([]);
  const [arrH, setArrH] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    loadCalendarEvents();
  }, []);

  const loadCalendarEvents = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents`);

    const filteredEvents = result.data.filter((event) => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      const startDateRange = new Date("2022-09-15");
      const endDateRange = new Date("2023-01-30");
      setEvents(result.data);
      let arr = result.data.map(e => e.unitName);
      arr = [...new Set(arr)];
      let seq = {};
      arr.forEach(
        (e, i) => {
          seq[e] = i
        }
      )
      setArrH(seq);

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


  // const handleEventClick = (event) => {
  // alert(`Event: ${event.title}`);
  // };

  const getEventWeekStyle = (event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    // const endDated = new Date(ev);

    // Fixed timeline start date
    const timelineStart = new Date('2022-09-15');

    // Calculate the number of weeks between the event start and end
    const durationWeeks = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7) + 1;

    // Calculate the number of weeks between the start of the timeline and the start of the event
    const offsetWeeks = (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24 * 7);

    return {
      left: `calc(${(offsetWeeks / 20) * 100}% + 10px)`, // 20 does not make sense , just for visual demostration
      width: `calc(${(durationWeeks / 20) * 100}% - 20px)`, // 20 does not make sense , just for visual demostration
      // backgroundColor: event.type === 'SUMMATIVE' ? 'red' : event.type ==='FORMATIVE' ? 'green' : event.type ==='CAPSTONESUMMATIVE'? 'purple': 'default-color',
      backgroundColor:
        event.type.toUpperCase() === "SUMMATIVE"
          ? "#B20000"
          : event.type.toUpperCase() === "FORMATIVE"
            ? "green"
            : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
              ? "purple"
              : "default-color",
    };
  };


  const handleNextButtonClick = () => {
    if (currentTerm === "TB1") {
      setCurrentTerm("TB2");
    } else {
      setCurrentTerm("TB1");
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };

  const handlePrevButtonClick = () => {
    if (currentTerm === "TB1") {
      setCurrentTerm("TB2");
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentTerm("TB1");
    }
  };

  return (
    <div className="timeline-container">
      {/* Title and Navigation Buttons */}
      <Box display='grid' gridTemplateColumns="repeat(10, 1fr)" gap={2}  >
        <Typography gridColumn="span 4" variant='h6' text='textSecondary' align="left">
          Computer Science
        </Typography>
        <Box display='flex' gridColumn="span 3" >
          <Button color="secondary" onClick={() => {
            setCurrentYear(currentYear - 1)
            if (currentTerm === "TB1") {
              setCurrentTerm("TB2")
            } else {
              setCurrentTerm("TB1")
            }
          }}>
            <NavigateBeforeIcon />
          </Button>
          <Typography fontSize={18} p={2}>{currentYear}~{currentYear + 1} {currentTerm}</Typography>
          <Button color="secondary" onClick={() => {
            setCurrentYear(currentYear + 1)
            if (currentTerm === "TB1") {
              setCurrentTerm("TB2")
            } else {
              setCurrentTerm("TB1")
            }
          }}>
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

      {/* <div className="weeks-container" style={{marginLeft:'150px'}}> */}
      <div className="weeks-container" >
        {weeks.map((week, index) => (
          <div className="week" key={week} style={{ flex: 1 }}>
            {week}
            {index !== week.length && index !== 0 && <div className="vertical-week" style={{ height: `${(Object.values(arrH).length - 1) / 2 * 780}%` }}></div>}
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
            const unitHeight = 150;

            return (
              <div key={index}>
                {!isSameUnit && (
                  <div
                    className="unitName"
                    style={{ height: `${unitHeight}px` }}
                  >
                    {unitName}
                  </div>

                )}
              </div>
            );
          })}
        </div>
        {events.map((event, index) => (
          <Tooltip
            title={
              <div>
                <Typography variant="subtitle1">{event.title}</Typography>
                <Typography variant="body2">Start Date: {event.start}</Typography>
                <Typography variant="body2">End Date: {event.end}</Typography>
                {event.location && (
                  <Typography variant="body2">Location: {event.location}</Typography>
                )}
              </div>
            }
            key={index}
            onClick={() => handleEventClick(event)}
          >
            <div
              className="event"
              style={{
                ...getEventWeekStyle(event), top: `${arrH[event.unitName] * 150 + (event.weight >= 40 ? 80 : 30)}px`,
                height: `${event.weight >= 40 ? 40 : 20}px`,
              }}
              onClick={() => handleEventClick(event)}
            >
              {event.title}
            </div>
          </Tooltip>
        ))}

      </div>
      <EventDialog open={openDialog} handleCloseDialog={handleCloseDialog} event={selectedEvent} />
    </div>
  );
};

export default WeeklyCalendar;


