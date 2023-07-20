import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { Link as RouterLink } from 'react-router-dom';

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

  useEffect(() => {
    //TODO fetch user data here from an API later
    setUsername('Simon');
    setPassword('password');
    setEmail('test44@gmail.com');
    setName('Simon');
    // setGrade('First year');
    setMajor('Computer Science');
    setIsLoading(false);
  }, []);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    //TODO Implement update profile logic later
    alert('Profile Updated!');
  };

  if (isLoading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
                value={username}
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
                value={email}
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
                value={major}
                fullWidth
                margin="normal"
                onChange={(e) => setMajor(e.target.value)}
                disabled
              />
              <TextField
                select
                label="Major"
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
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, backgroundImage: 'linear-gradient(to right, #B20000 , #a0332c)', color: 'white' }}>
              <SettingsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Settings
            </Typography>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
              label="Dark Mode"
            />
            <TextField
              select
              label="Language"
              value={language}
              fullWidth
              margin="normal"
              onChange={(e) => setLanguage(e.target.value)}
              SelectProps={{
                native: true, // Use native select element to properly handle select event
              }}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Chinese">Chinese</option>
            </TextField>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
