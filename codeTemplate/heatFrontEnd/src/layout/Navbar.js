import { Box, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
import EditIcon from '@mui/icons-material/Edit';
import {useLocation} from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const user = useSelector(state => state.user);
  const isStaff = user.staff;

  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/login';

  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{
      backgroundImage: 'linear-gradient(to right, #DF2E38 , #a0332c)',
      borderRadius: '5px',
      width: isSmallScreen ? '305vw' : isMediumScreen ? '155vw' : '100%',
    }}>
      {/* Software Title */}
      <Typography variant='h6' fontWeight='bold' component={Link} to='/home' disabled={isHomePage}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold', // Set the fontWeight using sx prop
                    pointerEvents: isHomePage ? 'none' : 'auto', // Disable pointer events based on isHomePage
                    opacity: isHomePage ? 0.5 : 1, // Reduce opacity for disabled link
                  }}
      >
        Assessment Calendar Tool
      </Typography>
      {/* ICONS */}
      <Box display="flex">
        <IconButton component={Link} to='/home' disabled={isHomePage}>
          <HomeIcon id="homeIcon"/>
        </IconButton>
        {isStaff &&<IconButton component={Link} to='/addEvent' >
          <AddIcon id="addIcon"/> 
        </IconButton>}
        { isStaff  && <IconButton component={Link} to='/EditMenu'>
          <EditIcon id="editIcon"/>
        </IconButton>}
        <IconButton component={Link} to='/user-info' disabled={isHomePage}>
          <PersonIcon id="personIcon"/>
        </IconButton>
        <IconButton component={Link} to='/Notification' disabled={isHomePage}>
          <NotificationsIcon id="notificationIcon" />
        </IconButton>
        <Link to="/login">
          <IconButton onClick={() => dispatch(resetUser())}>
            <LogoutIcon id="logoutIcon" />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;