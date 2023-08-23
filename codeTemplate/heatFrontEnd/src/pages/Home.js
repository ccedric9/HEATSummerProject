import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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




const Home = () => {

  const user = useSelector(state => state.user);
  const isStaff = user.staff;
  const location = useLocation();

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
  const program = user.major;
  // const program = 'Mechanical Engineering';
  const firstYear = 2022;
  const academicYear = 1;
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

  const [activeButton, setActiveButton] = useState('home'); // Set the initial active button

  const handleButtonClick = (buttonId) => {
    console.log('Button clicked:', buttonId);
    setActiveButton(buttonId);
  };

  let unitFilteredEvents = events.filter((event) => event.programName === program && event.academicYear===(currentYear - firstYear + 1));
  let uniqueUnitNames = new Set();
  unitFilteredEvents.forEach((event) => {
    uniqueUnitNames.add(event.unitName);
  });
  let totalUniqueUnitNames =uniqueUnitNames.size;;
   
  // console.log(totalUniqueUnitNames)
  // console.log(unitFilteredEvents);

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
    const timelineStart = new Date(`${currentYear}` + "-09-01");

    const offsetDays = (startDate-timelineStart) / (1000 * 60 * 60 * 24) + 1;
    const durationDays = (endDate-startDate) / (1000 * 60 * 60 * 24);

    return {
      left: `calc(${(offsetDays / 365 ) * 100}%)`,
      width: event.start === event.end? "1%":`calc(${(durationDays / 365 ) * 100}%)`,
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
    const timeDifference = endDate-startDate;
    const targetTimeDifference = currentDate-startDate;

    return ((targetTimeDifference / timeDifference) * 100);
  }

  const leftPosition = `${updateTime()}%`;

  return (
    <div className="timeline-container">
      {/* Title and Navigation Buttons */}
      <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={2}>
        <Typography gridColumn="span 4" variant="h6" text="textSecondary" align="left">
          Programme: {program}
        </Typography>

        <Box display="flex" gridColumn="span 3">
          <Button color="secondary" onClick={() => 
            currentYear == firstYear ? setCurrentYear(currentYear + 2) : setCurrentYear(currentYear - 1)}
            aria-label="Previous Year">
            <NavigateBeforeIcon />
          </Button>
          <div className="timelinebar-middle">
            <div className="yearIndicator">Year {currentYear - firstYear + 1}</div>
            <div>
              {currentYear} - {currentYear + 1}
            </div>
          </div>
          <Button color="secondary" onClick={() => {
            currentYear == firstYear + 2 ? setCurrentYear(firstYear) : setCurrentYear(currentYear + 1)
            }}aria-label="Next Year">
            <NavigateNextIcon />
          </Button>
        </Box>
        <Box gridColumn="span 3" align="right">
          <ButtonGroup variant="contained" aria-label="outlined primary button group" color="inherit">
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
                id="module-btn"
                component={Link}
                to="/CalendarByModule"
                sx={{ color: "white", backgroundColor: location.pathname === '/CalendarByModule' ? "#3498db" : "#a0332c" }}
            >
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
            {index !== months.length && index !== 0 && <div className="vertical-line" style={{  
              height: `${totalUniqueUnitNames * 640}%`, }}></div>}
          </div>
        ))}
      </div>


      {/* Events */}
      <div className="test-container">
        {/*timeline*/}
        {showTimeline && (
            <div>
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
          <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: `${leftPosition}`,
                fontSize: '14px', // Adjust font size as needed
                fontWeight: 'bold', // Adjust font weight as needed
                color: 'darkslategray', // Adjust color as needed
                backgroundColor: 'white', // Add background color if desired
                padding: '2px 5px', // Add padding for better appearance
                borderRadius: '4px', // Add border radius for rounded corners
                zIndex: '999',
            }}
          >Date</div>
            </div>
        )}
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
                      <div className="events-container">
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
                                    ...getEventStyle(event),
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
              {isStaff && <Button component={Link} to={`/editEvent/${selectedEvent.id}`}>Edit</Button>}
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Home;
