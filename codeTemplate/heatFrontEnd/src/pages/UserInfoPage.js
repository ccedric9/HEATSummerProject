import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Card, CardContent, Button, Box, Grid } from "@mui/material";
import { resetUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

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
        <Box mt={2}>
          <Typography variant="h4" align="center">User Info</Typography>
        </Box>
        <Box mt={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Name: {user.firstName} {user.lastName}</Typography>
              <Typography variant="h6" align="center" style={{marginTop: '20px'}}>Email: {user.email}</Typography>
              <Typography variant="h6" align="center" style={{marginTop: '20px'}}>Major: {user.major}</Typography>
              <Typography variant="h6" align="center" style={{marginTop: '20px'}}>Course: {user.program}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box mt={2}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
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
