import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';

const majors = [
  "Aerospace Engineering",
  "Civil Engineering",
  "Computer Science",
  "Electrical and Electronic Engineering",
  "Engineering Design",
  "Engineering Mathematics",
  "Mechanical Engineering"
];

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [major, setMajor] = useState('');
  const [staff,setStaff] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const navigate = useNavigate();


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
      staff:staff,
    };

    try {
      await axios.post('/api/v1/registration', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // If the request is successful, reset the form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setMajor('');
      setConfirmPassword('');

      navigate('/login');
      alert('Registration Success');

    } catch (error) {
      // handle error here
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
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" style={{ marginTop: '20px' }}>Registration</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
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
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Major</InputLabel>
          <Select
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          >
            {majors.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{ marginTop: '20px' }}
          fullWidth
        >
          Register
        </Button>
      </form>
    </Container>
  );
}

export default Registration;
