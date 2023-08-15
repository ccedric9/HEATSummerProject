import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';
import heatProgramData from '../jsondata/heatProgram.json';
import { Autocomplete, ListItemText } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { styled } from '@mui/system';
const StyledContainer = styled(Container)({
  '& .MuiFormLabel-asterisk': {
    color: 'red',
  },
});

const majors = heatProgramData.map((data) => data.major);

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [major, setMajor] = useState('');
  const [courses, setCourses] = useState([]);
  const [staff, setStaff] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [entryYear, setEntryYear] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (v, i) => currentYear - i);

  const navigate = useNavigate();

  useEffect(() => {
    if (!staff) {
      setCourses([]);
    }
  }, [staff]);

  const majors = heatProgramData.map((program) => program.major);

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
    if (staff) {
      const selectedMajorData = heatProgramData.find((program) => program.major === event.target.value);
      setCourses(selectedMajorData ? selectedMajorData.units : []);
    }
  };

  // 定义处理多选的函数
  const handleCoursesChange = (selectedOptions) => {
    setCourses(selectedOptions);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      major: major,
      staff: staff,
      courses: courses,
      entryYear: entryYear,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/registration`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setMajor('');
      setConfirmPassword('');
      setStaff(false);
      setCourses([]);

      navigate('/login');
      alert('Registration Success');

    } catch (error) {
      alert('Registration Failed');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStrength(zxcvbn(e.target.value).score);
  };

  const passwordStrengthMessage = () => {
    switch (passwordStrength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  return (
    <StyledContainer  maxWidth="xs" style={{
      minHeight: '80vh',
      height: isSmallScreen ? '130vh' : isMediumScreen ? '100vw' : 'auto',
    }}>
      <Typography variant="h4" style={{ marginTop: '20px' }}>Registration</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit} id="registration-form">
        <TextField
          id="first-name"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          id="last-name"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          error={!isValidEmail(email)} // Add error prop based on email validity
          helperText={
            !isValidEmail(email) ? (
              <Typography variant="body2" color="error">
                Invalid email format
              </Typography>
            ) : (
              ''
            )
          }
        />
        <TextField
          id="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          helperText={passwordStrengthMessage()}
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          id="confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          fullWidth
          margin="normal"
          required
          helperText={
            confirmPassword !== password ? (
              <Typography variant="body2" color="error">
                Passwords do not match
              </Typography>
            ) : (
              ''
            )
          }
        />

        <FormControlLabel
          id="staff-checkbox"
          control={
            <Checkbox
              checked={staff}
              onChange={(e) => setStaff(e.target.checked)}
              color="primary"
            />
          }
          label="Staff"
        />

        <FormControl fullWidth margin="normal" required>
          <Autocomplete
            id="major-combo-box"
            options={majors}
            value={major}
            onChange={(event, newValue) => {
              setMajor(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Major" />}
          />
        </FormControl>

        {staff && (
          <FormControl fullWidth margin="normal" required>
            <Autocomplete
              multiple
              id="courses-checkboxes"
              options={major !== '' ? heatProgramData.find(majorData => majorData.major === major).units : []}
              value={courses}
              onChange={(event, newValue) => {
                setCourses(newValue);
              }}
              disableCloseOnSelect
              getOptionSelected={(option, value) => option === value}
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props} style={{ backgroundColor: selected ? 'lightgreen' : 'lightgray' }}>
                  <Checkbox checked={selected} />
                  <ListItemText primary={option} />
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Courses" placeholder="Courses" />
              )}
            />
          </FormControl>
        )}

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="entry-year-label">Entry Year</InputLabel>
          <Select
            id="entry-year-select"
            labelId="entry-year-label"
            value={entryYear}
            onChange={(event) => setEntryYear(event.target.value)}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          id="register-button"
          type="submit"
          color="primary"
          variant="contained"
          style={{ marginTop: '20px' }}
          fullWidth
        >
          Register
        </Button>
      </form>
    </StyledContainer >

  );
}

export default Registration;
