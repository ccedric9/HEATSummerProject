import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import shadows from "@mui/material/styles/shadows";
import EventPopover from "./EventPopover";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from 'react-redux';



const Home = () => {

  const user = useSelector(state => state.user);
  console.log(user);

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

  // User program defines here
  // const program = 'Computer Science';
  const program = 'Mechanical Engineering';
  const firstYear = 2022;

  const [events, setEvents] = useState([]);
  const [unitNameCounts, setUnitNameCounts] = useState({});
  const [currentYear, setCurrentYear] = useState(firstYear);
  const [arrH, setArrH] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showTimeline, setShowTimeline] = useState(true);

  const theme = useTheme();
  const isMdScreenOrWider = useMediaQuery(theme.breakpoints.up("md"));

  const startDate = new Date(`${currentYear}-09-12`);
  const endDate = new Date(`${startDate.getFullYear()+1}-09-01`);
  const currentDate = new Date();

  useEffect(() => {
    try {
      loadCalendarEvents();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(()=>{
    setShowTimeline(currentDate<endDate && currentDate>startDate);
    // setShowTimeline(currentYear===thisYear);
  })

  const loadCalendarEvents = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents`);
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
      //Caculate the number of each unit name
      const counts = {};
      result.data.forEach((event) => {
        const { unitName } = event;
        counts[unitName] = counts[unitName] ? counts[unitName] + 1 : 1;
      });
      setUnitNameCounts(counts);
    } catch (err) {
      console.error(err);
      // Handle the error appropriately for your application
    }
  };

  const selectedEvents = events.filter((event) => event.programName === program && event.academicYear === currentYear - firstYear + 1);


  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const getEventStyle = (event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const eventDescription = new Date(event.description);

    // Fixed timeline start date
    const timelineStart = new Date(`${firstYear}` + "-09-01");

    // Calculate the number of days between the event start and end
    const durationDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

    // Calculate the number of days between the start of the timeline and the start of the event
    const offsetDays = (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);

    return {

      left: `calc(${(offsetDays / 365) * 100}% + 10px)`,
      width: `calc(${(durationDays / 365) * 100}% - 20px)`,
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

    const timeDifference = endDate-startDate;

    // const targetDate = new Date();
    const targetTimeDifference = currentDate-startDate;
    // console.log(targetTimeDifference);
    // console.log(timeDifference);

    return ((targetTimeDifference / timeDifference) * 100);
  }
  const leftPosition = `${updateTime()}%`;

  return (
    <div className="timeline-container">
      {/* Title and Navigation Buttons */}
      <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={2}>
        <Typography gridColumn="span 4" variant="h6" text="textSecondary" align="left">
          {program}
        </Typography>

        <Box display="flex" gridColumn="span 3">
          <Button color="secondary" onClick={() => currentYear == firstYear ? setCurrentYear(currentYear + 2) : setCurrentYear(currentYear - 1)}>
            <NavigateBeforeIcon />
          </Button>
          <div className="timelinebar-middle">
            <div className="yearIndicator">Year {currentYear - firstYear + 1}</div>
            <div>
              {currentYear} - {currentYear + 1}
            </div>
          </div>
          <Button color="secondary" onClick={() => currentYear == firstYear + 2 ? setCurrentYear(firstYear) : setCurrentYear(currentYear + 1)}>
            <NavigateNextIcon />
          </Button>
        </Box>
        <Box gridColumn="span 3" align="right">
          <ButtonGroup variant="contained" aria-label="outlined primary button group" color="inherit">
            <Button component={Link} to="/" sx={{ color: "black", backgroundColor: "#a0332c" }}>
              Year
            </Button>
            <Button component={Link} to="/weeklyCalendar" sx={{ color: "black", backgroundColor: "#a0332c" }}>
              Term
            </Button>
            <Button component={Link} to="/CalendarByModule" sx={{ color: "black", backgroundColor: "#a0332c" }}>
              Module
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      {/* Months */}
      {/* Months */}
      <div className="months-container">
        {months.map((month, index) => (
          <div className="month" key={month}>
            {month}
            {index !== months.length && index !== 0 && <div className="vertical-line" style={{ height: `${(Object.values(arrH).length - 1) * 765}%` }}></div>}
          </div>
        ))}
      </div>


      {/* Events */}
      <div className="events-container">
        {showTimeline && (
            <div
                class="timeline"
                style={{
                  position: 'absolute',
                  top: '-50px',
                  bottom: '0',
                  left: `${leftPosition}`,
                  width: '2px',
                  height: '950px',
                  border: '1px dashed cadetblue',
                  zIndex: '999',
                }}
            ></div>
        )}
        {/*curriculum*/}
        <div className="unitNames-container">
          {Array.from(new Set(events.map(event => event.unitName))).map((unitName, index) => {
            const filteredEvents = selectedEvents.filter(event => event.unitName === unitName);
            if (filteredEvents.length === 0) return null;
            return (
                <div className="unitName"
                     style = {{height:'150px'}}
                >{unitName}</div>
            )
          })}
        </div>

        {selectedEvents.map((event, index) => (
          <Tooltip
            title={
              <div>
                <Typography variant="subtitle1">{event.title}</Typography>
                <Typography variant="body2">Start Date: {event.start}</Typography>
                <Typography variant="body2">End Date: {event.end}</Typography>
                <Typography variant="body2">Year: {event.academicYear}</Typography>
                <Typography variant="body2">Term: {event.term}</Typography>
                <Typography variant="body2">{currentYear - firstYear + 1}</Typography>
                {/* <Typography variant="body2">{currentTerm}</Typography> */}
                {event.location && (
                  <Typography variant="body2">Location: {event.location}</Typography>
                )}
              </div>
            }
            key={index}
          >
            <div
              className="event"
              key={index}
              style={{
                ...getEventStyle(event),
                // top: `${arrH[event.unitName] * 150 + (event.weight >= 40 ? 80 : 30)}px`,
                // top: `${arrH[event.unitName]  + (event.weight >= 40 ? 100 : 50)}px`,
                height: `${event.weight >= 40 ? 40 : 20}px`,
              }}
              onClick={() => handleEventClick(event)}
            >
              {event.title}
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Event Popup Dialog */}
      <Dialog open={selectedEvent !== null} onClose={handleCloseDialog}>
        {selectedEvent && (
          <>
            <DialogTitle style={{ textAlign: "center", fontSize: "24px" }}>
              {selectedEvent.title}
            </DialogTitle>
            <DialogContent>
              {selectedEvent.start && (
                <Typography variant="body1">
                  Start Date: {selectedEvent.start}
                </Typography>
              )}
              {selectedEvent.end && (
                <Typography variant="body1">
                  End Date: {selectedEvent.end}
                </Typography>
              )}
              {selectedEvent.type && (
                <Typography variant="body1">
                  Type: {selectedEvent.type}
                </Typography>
              )}
              {selectedEvent.weight && (
                <Typography variant="body1">
                  Weight: {selectedEvent.weight} %
                </Typography>
              )}
              {selectedEvent.summary && (
                <Typography variant="body1">
                  Summary:{" "}
                  {selectedEvent.summary.startsWith("http") ? (
                    <a href={selectedEvent.summary} target="_blank" rel="noreferrer">
                      {selectedEvent.summary.slice(0, 40) + (selectedEvent.summary.length > 40 ? "..." : "")}
                    </a>
                  ) : (
                    selectedEvent.summary.length > 20 ? (
                      selectedEvent.summary.split(" ").slice(0, 20).join(" ") + "..."
                    ) : (
                      selectedEvent.summary
                    )
                  )}
                </Typography>
              )}
              {selectedEvent.location && (
                <Typography variant="body1">
                  Location: {selectedEvent.location}
                </Typography>
              )}
              {selectedEvent.feedback && (
                <Typography variant="body1">
                  Feedback:{" "}
                  {selectedEvent.feedback.startsWith("http") ? (
                    <a href={selectedEvent.feedback} target="_blank" rel="noreferrer">
                      {selectedEvent.feedback.slice(0, 40) + (selectedEvent.feedback.length > 40 ? "..." : "")}
                    </a>
                  ) : (
                    selectedEvent.feedback.length > 20 ? (
                      selectedEvent.feedback.split(" ").slice(0, 20).join(" ") + "..."
                    ) : (
                      selectedEvent.feedback
                    )
                  )}
                </Typography>
              )}
              {selectedEvent.description && (
                <Typography variant="body1">
                  Description: {selectedEvent.description}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Home;
