import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format, isAfter } from 'date-fns';
import {
  Button,
  TextField,
  Typography,
  Container,
  Link as MuiLink,
  Paper,
  Avatar,
  Grid,
  FormControlLabel,
  Switch,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationImportant from "@mui/icons-material/NotificationImportant";
import { Link as RouterLink } from 'react-router-dom';
import EventDialog from "../pages/EventDialog";
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../redux/slices/userSlice';
import { addMonths, isBefore, isWithinInterval } from 'date-fns';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  // const [grade, setGrade] = useState('');
  const [major, setMajor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [events, setEvents] = useState([]);
  const [arrH, setArrH] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [unitNameCounts, setUnitNameCounts] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    try {
        loadCalendarEvents();
    } catch (error) {
        console.error(error);
    }
    //TODO fetch user data here from an API later
    setUsername('Simon');
    setPassword('password');
    setEmail('test44@gmail.com');
    setName('Simon');
    // setGrade('First year');
    // setMajor('Mechanical Engineering');
    setIsLoading(false);
  }, []);

  const filterUpcomingAssessments = (events) => {
    const today = new Date();
    const nextMonth = addMonths(today, 1);

    return events.filter((event) => {
      const startDate = new Date(event.start);
      return isWithinInterval(startDate, { start: today, end: nextMonth }) && event.programName === user.major;
    });
  };

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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    //TODO Implement update profile logic later
    alert('Profile Updated!');
  };

  

  if (isLoading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, backgroundImage: 'linear-gradient(to right, #B20000 , #a0332c)', color: 'white' }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Profile
            </Typography>
            <form noValidate autoComplete="off" style={{ width: '100%', marginTop: '20px' }} onSubmit={handleUpdateProfile}>
              <TextField
                label="Username"
                value={user.firstName + '\t' + user.lastName}
                fullWidth
                margin="normal"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                value={password}
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Email"
                value={user.email}
                fullWidth
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              <TextField
                label="Name"
                value={name}
                fullWidth
                margin="normal"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Major"
                value={user.major}
                fullWidth
                margin="normal"
                onChange={(e) => setMajor(e.target.value)}
                disabled
              />
              <TextField
                select
                label="Grade"
                value={language}
                fullWidth
                margin="normal"
                onChange={(e) => setLanguage(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Last Year">Last Year</option>
                <option value="Master Year">Master Year</option>
              </TextField>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginTop: '20px' }}
                fullWidth
              >
                Update Profile
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, backgroundImage: 'linear-gradient(to right, #B20000 , #a0332c)', color: 'white' }}>
              <NotificationImportant />
            </Avatar>
            <Typography component="h1" variant="h5">
              Assessment Due
            </Typography>

            <br></br>
            <Typography component="h1" variant="h5">
              Ongoing Assessment
            </Typography>
            {events.map((event) => {
              const today = new Date();
              const startDate = new Date(event.start);
              const endDate = new Date(event.end);
              const eventBackgroundColor =
                event.type.toUpperCase() === "SUMMATIVE"
                  ? "#CC313D"
                  : event.type.toUpperCase() === "FORMATIVE"
                  ? "#2C5F2D"
                  : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                  ? "#8A307F"
                  : "default-color";
              if (isAfter(today, startDate) && isAfter(endDate, today) && event.programName === user.major) {
                return (
                  <div key={event.id} onClick={() => handleEventClick(event)}>
                    <Paper key={event.id} style={{ padding: '10px', marginBottom: '10px', backgroundColor: eventBackgroundColor , textAlign: 'center', color: 'white'}}>
                    <Typography variant="subtitle1">{event.title}</Typography>
                    <Typography variant="subtitle1">{event.programName}</Typography>
                    <Typography variant="subtitle2">{event.start} -- {event.end}</Typography>
                  </Paper>
                  </div>
                );
              }
              return null;
            })}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, backgroundImage: 'linear-gradient(to right, #B20000 , #a0332c)', color: 'white' }}>
                <NotificationImportant />
              </Avatar>
              <Typography component="h1" variant="h5">
                Assessment Due
              </Typography>

              <br></br>
              <Typography component="h1" variant="h5">
                Upcoming Assessment
              </Typography>
              {filterUpcomingAssessments(events).map((event) => {
                const today = new Date();
                const startDate = new Date(event.start);
                const endDate = new Date(event.end);
                const eventBackgroundColor =
                  event.type.toUpperCase() === "SUMMATIVE"
                    ? "#CC313D"
                    : event.type.toUpperCase() === "FORMATIVE"
                    ? "#2C5F2D"
                    : event.type.toUpperCase() === "CAPSTONESUMMATIVE"
                    ? "#8A307F"
                    : "default-color";
                if (isAfter(startDate, today) && event.programName === user.major) {
                  return (
                    <div key={event.id} onClick={() => handleEventClick(event)}>
                      <Paper key={event.id} style={{ padding: '10px', marginBottom: '10px', backgroundColor: eventBackgroundColor , textAlign: 'center', color: 'white'}}>
                      <Typography variant="subtitle1">{event.title}</Typography>
                      <Typography variant="subtitle1">{event.programName}</Typography>
                      <Typography variant="subtitle2">{event.start} -- {event.end}</Typography>
                    </Paper>
                    </div>
                  );
                }
                return null;
              })}
            </Paper>
        </Grid>
      </Grid>
      <EventDialog open={openDialog} handleCloseDialog={handleCloseDialog} event={selectedEvent} />
    </Container>
    
  );
};

export default UserProfile;
