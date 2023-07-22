// src/pages/UserInfoPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import { resetUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

function UserInfoPage() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetUser());
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{marginTop: '20px', marginBottom: '20px'}}>User Info</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Name: {user.firstName} {user.lastName}</Typography>
          <Typography variant="h6" style={{marginTop: '20px'}}>Email: {user.email}</Typography>
          <Typography variant="h6" style={{marginTop: '20px'}}>Major: {user.major}</Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="secondary"
        style={{marginTop: '20px'}}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
}

export default UserInfoPage;
