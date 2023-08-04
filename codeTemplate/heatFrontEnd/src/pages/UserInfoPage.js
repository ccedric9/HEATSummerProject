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
        {/* <Box mt={2}>
          <Typography variant="h4" align="center">User Info</Typography>
        </Box>
        <Box mt={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Name: {user.firstName} {user.lastName}</Typography>
              <Typography variant="h6" align="center" style={{marginTop: '20px'}}>Email: {user.email}</Typography>
              <Typography variant="h6" align="center" style={{marginTop: '20px'}}>Major: {user.major}</Typography>
              <Typography variant="h6" align="center" style={{marginTop: '20px'}}>Course: {user.courses}</Typography>
            </CardContent>
          </Card>
        </Box> */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, backgroundImage: 'linear-gradient(to right, #B20000 , #a0332c)', color: 'white' }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Profile
            </Typography>
            <form noValidate autoComplete="off" style={{ width: '100%', marginTop: '20px' }}>
              <TextField
                label="Name"
                value={user.firstName + '\t' + user.lastName}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Email"
                value={user.email}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Major"
                value={user.major}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Entry Year"
                value={user.entryYear}
                fullWidth
                margin="normal"
                disabled
              />
            </form>
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
                  backgroundColor: 'black',
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
