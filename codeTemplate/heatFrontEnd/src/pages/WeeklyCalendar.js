// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, Icon, Typography, Tooltip } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EventDialog from "./EventDialog";

  // User program defines here
// const program = 'Computer Science';
const program = 'Mechanical Engineering';
const firstYear= 2022;

const WeeklyCalendar = () => {
  const weeks = Array.from({ length: 13 }, (_, index) => index + 1);
  const [unitNameCounts, setUnitNameCounts] = useState({});
  const [currentYear, setCurrentYear] = useState(firstYear);
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
    // const endDated = new Date(ev);

    // Fixed timeline start date
    const timelineStart = currentTerm === 'TB1' ? new Date(currentYear +"-09-15") : new Date(currentYear + 1 +"-01-20");

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
          ? "#CC313D"
          : event.type.toUpperCase() === "FORMATIVE"
          ? "#2C5F2D"
          : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
          ? "#8A307F"
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
          {program}
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

        {/*<div*/}
        {/*    class="timeline"*/}
        {/*    style={{*/}
        {/*      position: 'absolute',*/}
        {/*      top: '-50px',*/}
        {/*      bottom: '0',*/}
        {/*      left: `${leftPosition}`,*/}
        {/*      width: '2px', */}
        {/*      height: '950px',*/}
        {/*      // backgroundColor: 'lightslategrey',*/}
        {/*      border: '1px dashed cadetblue',*/}
        {/*      zIndex: '999',*/}
        {/*    }}*/}
        {/*></div>*/}

        <div className="unitNames-container">
          {selectedEvents.map((event, index) => {
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
        {selectedEvents.map((event, index) => (
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


