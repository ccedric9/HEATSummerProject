// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import "./WeeklyCalendar.css"; 
import { Box, Button, ButtonGroup, Icon, Typography, Tooltip } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EventDialog from "./EventDialog";
import { useSelector } from 'react-redux';

  // User program defines here
// const program = 'Computer Science';
const firstYear= 2022;

const WeeklyCalendar = () => {
  const user = useSelector(state => state.user);
  const isStaff = user.staff;
  const program = user.major;
  const location = useLocation();

  const weeks = Array.from({ length: 13 }, (_, index) => index + 1);
  const [unitNameCounts, setUnitNameCounts] = useState({});
  const [currentYear, setCurrentYear] = useState(firstYear);
  const [currentTerm, setCurrentTerm] = useState("TB1");
  const [events, setEvents] = useState([]);
  const [arrH, setArrH] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);
  const startDate = new Date(`${currentYear}-09-12`);
  const endDate = new Date(`${startDate.getFullYear()+1}-09-01`);
  const currentDate = new Date();

  const currentTermNumber = parseInt(currentTerm.replace(/\D/g, ""));
  let unitFilteredEvents = events.filter((event) => event.programName === program && event.academicYear===(currentYear - firstYear + 1) && event.term === currentTermNumber);
  let uniqueUnitNames = new Set();
  unitFilteredEvents.forEach((event) => {
    uniqueUnitNames.add(event.unitName);
  });
  let totalUniqueUnitNames =uniqueUnitNames.size;;
  console.log(totalUniqueUnitNames)
  console.log(unitFilteredEvents);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(()=>{
    setShowTimeline(currentDate<endDate && currentDate>startDate);
    // setShowTimeline(currentYear===thisYear);
  })
  useEffect(() => {
    loadCalendarEvents();
  }, [currentYear, currentTerm]);

  const loadCalendarEvents = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents`);

    const filteredEvents = result.data.filter((event) => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);

      // const startDateRange = currentTerm ==='TB1'? new Date(currentYear + "-09-01"): new Date(`${currentYear+1}` + "-01-20");
      // const endDateRange = currentTerm ==='TB1'? new Date( `${currentYear+1}` + "-01-20"): new Date(`${currentYear+1}` + "-08-31");
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
        event.programName === program &&
        event.academicYear === currentYear - firstYear + 1 &&
        event.term === (currentTerm === "TB1" ? 1 : 2)
      );
    });
    console.log("Filtered Events:", filteredEvents);
    console.log(currentYear);
    setEvents(filteredEvents);

    // Update the unique unit names and their positions
    const uniqueNames = [...new Set(filteredEvents.map((event) => event.unitName))];
    const seq = {};
    uniqueNames.forEach((e, i) => {
      seq[e] = i;
    });
    setArrH(seq);

    // Calculate the number of each unit name
    const counts = {};
    filteredEvents.forEach((event) => {
      const { unitName } = event;
      counts[unitName] = counts[unitName] ? counts[unitName] + 1 : 1;
    });
    setUnitNameCounts(counts);
  };

  const selectedEvents = events.filter((event)=> 
  
    // event.programName === program 
    // && 
    event.academicYear === currentYear - firstYear + 1  
    &&
    currentTerm === 'TB1' ? (event.term === 1 ) : (event.term === 2)
  );


  const getEventWeekStyle = (event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
  
    // Fixed timeline start date
    const timelineStart = currentTerm === 'TB1' ? new Date(currentYear + "-09-15") : new Date(currentYear + 1 + "-01-20");
  
    // Calculate the number of weeks between the event start and end
    const durationWeeks = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7) + 1;
  
    // Calculate the number of weeks between the start of the timeline and the start of the event
    const offsetWeeks = (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24 * 7);
  
    return {
      left: `calc(${(offsetWeeks / 20) * 100}% + 10px)`, // 13 is the total number of weeks in a term
      width: event.start === event.end? "1%":`calc(${(durationWeeks / 20) * 100}%)`, // 13 is the total number of weeks in a term
      backgroundColor:
          event.type.toUpperCase() === "SUMMATIVE"
              ? "#C05555"
              : event.type.toUpperCase() === "FORMATIVE"
                  ? "#59886B"
                  : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                      ? "#6C5070"
                      : "default-color",
    };
  };



  function updateTime() {
    // the date vertical separate line

    const startDate = new Date(`${currentYear}-09-12`);
    const middleDate = new Date(`${currentYear}-01-12`);
    const endDate = new Date(`${startDate.getFullYear()+1}-09-21`);

    const timeDifference = endDate-startDate;
    const targetDate = new Date();
    const targetTimeDifference = targetDate-startDate;

    if (currentTerm==="TB1" && targetDate<middleDate ||
    currentTerm==="TB2" && targetDate>middleDate){
      return ((targetTimeDifference / timeDifference) * 100);
    } else if (currentTerm==="TB1" && targetDate>middleDate) {
      return 100;
    } else if (currentTerm==="TB2" && targetDate<middleDate) {
      return 0;
    }
  }

  const leftPosition = `${updateTime()}%`;

  return (
    <div className="timeline-container">
      {/* Title and Navigation Buttons */}
      <Box display='grid' gridTemplateColumns="repeat(10, 1fr)" gap={2}  >
        <Typography gridColumn="span 4" variant='h6' text='textSecondary' align="left">
          Programme: {program}
        </Typography>
        <Box display='flex' gridColumn="span 3" >
          <Button color="secondary" onClick={() => {
            if (currentTerm === "TB1") {
              currentYear == firstYear ? setCurrentYear(currentYear +2):setCurrentYear(currentYear - 1)
              setCurrentTerm("TB2")
            } else {
              setCurrentTerm("TB1")
            }
            console.log(currentTerm + currentYear);
            console.log(selectedEvents.map((event, index) => {
              return (event.unitName);
            }));
          }}>
            <NavigateBeforeIcon />
          </Button>
          <div className="timelinebar-middle">
            <div className="yearIndicator">{currentTerm}</div>
            <div>
            {currentYear} - {currentYear + 1}
            </div>
          </div>
          <Button color="secondary" onClick={() => {
            if (currentTerm === "TB1") {
              setCurrentTerm("TB2")
            } else {
              setCurrentTerm("TB1")
              currentYear == firstYear + 2 ? setCurrentYear(firstYear):setCurrentYear(currentYear + 1)
            }
            console.log(currentTerm + currentYear);
            console.log(selectedEvents.map((event, index) => {
              return (event.unitName);
            }));
          }}>
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

      {/* <div className="weeks-container" style={{marginLeft:'150px'}}> */}
      <div className="weeks-container" >
        {weeks.map((week, index) => (
          <div className="week" key={week} style={{ flex: 1 }}>
            {week}
            {index !== week.length && index !== 0 && <div className="vertical-week" style={{ height: `${totalUniqueUnitNames * 645}%` }}></div>}
          </div>
        ))}
      </div>


        
       {/* Events */}
       <div className="test-container">

        {/*curriculum+events*/}
        <div className="unitNames-container">
          {Array.from(new Set(events.map((event) => event.unitName))).map(
              (unitName, index) => {
                const filteredEvents = selectedEvents.filter(
                    (event) => event.unitName === unitName
                );
                if (filteredEvents.length === 0) return null;
                return (
                    <div className="component" key={index}>
                      <div className="unitName" style={{ height: '150px' }}>
                        {unitName}
                      </div>
                      <div className="eventsWeek-container">
                        {filteredEvents.map((event, eventIndex) => (
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
                                key={eventIndex}
                            >
                              <div
                                  className="event"
                                  style={{
                                    ...getEventWeekStyle(event),
                                    height:
                                        event.weight === 100
                                            ? '140px'
                                            : event.weight >= 80
                                                ? '104px'
                                                : event.weight >= 70
                                                    ? '91px'
                                                    : event.weight >= 60
                                                        ? '78px'
                                                        : event.weight >= 50
                                                            ? '65px'
                                                            : event.weight >= 40
                                                                ? '52px'
                                                                : event.weight >= 30
                                                                    ? '39px'
                                                                    : event.weight >= 20
                                                                        ? '26px'
                                                                        : '13px',
                                    display:
                                        new Date(event.start).getMonth() >= 6 &&
                                        new Date(event.start).getMonth() <= 8
                                            ? 'none'
                                            : 'block',
                                  }}
                                  onClick={() => handleEventClick(event)}

                                  key={eventIndex}
                              >
                                {event.title}
                              </div>
                            </Tooltip>
                        ))}
                      </div>
                    </div>
                );
              }
          )}
        </div>
      </div>
      <EventDialog open={openDialog} handleCloseDialog={handleCloseDialog} event={selectedEvent} />
    </div>
  );
};



export default WeeklyCalendar;


