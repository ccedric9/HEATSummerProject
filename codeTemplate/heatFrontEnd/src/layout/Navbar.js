import { Box, IconButton} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{
        backgroundImage: 'linear-gradient(to right, #B20000 , #a0332c)',
        borderRadius : '5px'
      }}>
        {/* Software Title */}
        <Typography variant = 'h6' fontWeight='bold' component={Link} to='/' sx={{color:'black', textDecoration:'None'}} >
            Assessment Calendar Tool
        </Typography>
      {/* ICONS */}
      <Box display="flex">
        <IconButton component={Link} to='/'>
          <HomeIcon />
        </IconButton>
        <IconButton component = {Link} to='/login'>
          <PersonIcon/>
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton component = {Link} to='/adminaccess'>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          < LogoutIcon/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;