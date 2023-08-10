import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Link as MuiLink, Box, Card, CardContent, Grid, InputAdornment, Snackbar } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { AccountCircle, LockRounded } from '@mui/icons-material';
import { useTheme, useMediaQuery } from "@mui/material";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Get the current user from Redux state
  const user = useSelector(state => state.user);

  // If there is a user logged in, navigate to the user info page
  useEffect(() => {
    if (user && user.email) {
      navigate('/home');
    }
  }, [user, navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, `username=${username}&password=${password}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log("response.data", response.data);
      // console.log(response.data.major);
      const status = response.status;
      dispatch(setUser({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        major: response.data.major,
        staff: response.data.staff,
        entryYear: response.data.entryYear,
      }));

      // check the first digit of the status code
      switch (Math.floor(status / 100)) {
        case 2:
          // if login is successful, show a success message
          // alert("Login Success");
          navigate('/home');
          break;
        case 3:
          // if the status code starts with 3, navigate to another page
          navigate('/');
          break;
        case 4:
          // if the status code starts with 4, show an error message
          setOpenSnackbar(true);
          break;
        default:
          // handle other cases
          break;
      }
    } catch (error) {
      // handle error here
      if (error.response && error.response.status === 401) {
        // handle login failed case
        setOpenSnackbar(true);
      } else {
        // handle network error
        setOpenSnackbar(true);
      }
    }
  };
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  return (
    <Container style={{
      minHeight: '100vh',
      height: isSmallScreen ? '200vh' : isMediumScreen ? '155vw' : 'auto',
      // backgroundImage: 'linear-gradient(to right top, #559966, #ff5e62)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isSmallScreen ? '305vw' : isMediumScreen ? '155vw' : 'auto',
    }}>
      <Card>
        <CardContent>
          <Typography variant="h4" style={{ marginBottom: '20px' }} align="center">Login</Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id = "username-input"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id = "password-input"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              id = "submit-btn"
              type="submit"
              variant="contained"
              fullWidth
              style={{ marginTop: '20px', backgroundColor: 'black' }}
            >
              Login
            </Button>
          </form>
          <Typography style={{ marginTop: '20px', textAlign: 'center' }}>
            Don't have an account? <MuiLink component={RouterLink} to="/signup">Sign Up</MuiLink>
          </Typography>
        </CardContent>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Login Failed" />
    </Container>
  );
}

export default Login;
