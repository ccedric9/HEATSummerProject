import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Card, CardContent, Button, Box, Grid, Paper, Avatar, TextField } from "@mui/material";
import { resetUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { red } from '@mui/material/colors';

function UserInfoPage() {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetUser());
    sessionStorage.removeItem('user'); 
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/home');
  }


  return (
    <Container maxWidth="sm">
      <Grid container direction="column" justify="center" style={{ minHeight: '80vh' }}>

        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, backgroundImage: 'linear-gradient(to right, #B20000 , #a0332c)', color: 'white' }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Profile
            </Typography>
            <div style={{ width: '100%', marginTop: '20px' , textAlign: 'center'}}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Major:</strong> {user.major}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Entry Year:</strong> {user.entryYear}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Box mt={2}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                // color= "error"
                sx={{
                  backgroundImage: 'linear-gradient(to right, #B20000, #a0332c)',
                  color: 'white',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(to right, #B20000, #a0332c)', // Gradient for hover state
                  },
                }}
                size="large"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'black', // Set the desired hover color here
                  },
                }}
                size="large"
                onClick={handleGoHome}
              >
                Go Home
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

export default UserInfoPage;
