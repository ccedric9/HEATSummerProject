import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/login', `username=${username}&password=${password}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      // console.log(response.data.major);
      const status = response.status;
      dispatch(setUser({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        major: response.data.major
      }));
      // check the first digit of the status code
      switch (Math.floor(status / 100)) {
        case 2:
          // if login is successful, show a success message
          alert("Login Success");
          break;
        case 3:
          // if the status code starts with 3, navigate to another page
          navigate('/');
          break;
        case 4:
          // if the status code starts with 4, show an error message
          alert("Login Error");
          break;
        default:
          // handle other cases
          break;
      }
    } catch (error) {
      // handle error here
      if (error.response && error.response.status === 401) {
        // handle login failed case
        alert("Login Failed");
      } else {
        // handle network error
        alert("Network Error");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" style={{marginTop: '20px'}}>Login</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{marginTop: '20px'}}
          fullWidth
        >
          Login
        </Button>
      </form>
      <Typography style={{marginTop: '20px'}}>
        Don't have an account? <MuiLink component={RouterLink} to="/signup">Sign Up</MuiLink>
      </Typography>
    </Container>
  );
}

export default Login;
