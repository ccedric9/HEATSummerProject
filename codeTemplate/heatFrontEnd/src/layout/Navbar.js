import { Box, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { resetUser } from '../redux/slices/userSlice';
import { useTheme, useMediaQuery } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isStaff = true;
  console.log(user);
  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{
      backgroundImage: 'linear-gradient(to right, #B20000 , #a0332c)',
      borderRadius: '5px',
      width: isSmallScreen ? '305vw' : isMediumScreen ? '155vw' : '100%',
    }}>
      {/* Software Title */}
      <Typography variant='h6' fontWeight='bold' component={Link} to='/' sx={{ color: 'black', textDecoration: 'None' }} >
        Assessment Calendar Tool
      </Typography>
      {/* ICONS */}
      <Box display="flex">
        <IconButton component={Link} to='/'>
          <HomeIcon />
        </IconButton>
        {isStaff &&<IconButton component={Link} to='/addEvent'>
          <AddIcon /> 
        </IconButton>}
        <IconButton component={Link} to='/login'>
          <PersonIcon />
        </IconButton>
        <IconButton component={Link} to='/Notification'>
          <NotificationsIcon />
        </IconButton>
        { isStaff  && <IconButton component={Link} to='/adminaccess'>
          <SettingsIcon />
        </IconButton>}

        <Link to="/login">
          <IconButton onClick={() => dispatch(resetUser())}>
            <LogoutIcon />
          </IconButton>
        </Link>


      </Box>
    </Box>
  );
};

export default Navbar;