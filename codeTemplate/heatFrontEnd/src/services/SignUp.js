import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container } from "@mui/material";

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      major: major
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

      alert('Registration Success');
    } catch (error) {
      // handle error here
      alert('Registration Failed');
    }
  };

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
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          type="major"
          fullWidth
          margin="normal"
          required
        />
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
