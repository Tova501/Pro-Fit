import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import { checkAuth, logoutUser } from '../redux/slices/userSlice';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Toolbar, IconButton, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarRateIcon from '@mui/icons-material/StarRate';
import ProfitLogo from '../assets/proFitLogo.png';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

interface SidebarProps {
  onToggleSidebar: (isOpen: boolean) => void;
}

const Sidebar = ({ onToggleSidebar }: SidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const location = useLocation();
  const isRecruiter = location.pathname.includes('recruiter');
  const isCandidate = location.pathname.includes('candidate');
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleSidebar = () => {
    const newState = !open;
    setOpen(newState);
    onToggleSidebar(newState);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const colorButtonSx = { [`& .MuiTypography-root`]: { color: 'primary.main', fontSize:'0.9rem' } }
  const colorIconSx = { color: 'primary.main' };

return (
  <>
    <Drawer
      variant="permanent"
      open={drawerOpen}
      sx={{
        boxShadow: '5px 0px 10px #2846707d',
        width: open ? 240 : 60,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? 240 : 60,
          boxSizing: 'border-box',
          backgroundColor: 'primary.background',
          transition: 'width 0.3s',
          overflow: 'hidden'
        },
      }}
    >
      <Toolbar sx={{ zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 3, marginBottom: 2 }}>

        {open}
        <IconButton onClick={toggleSidebar} sx={{ width: '40px', color: 'primary.main', position: 'absolute', top: 16, right: 10 }}>
          <ChevronLeftIcon sx={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }} />
        </IconButton>
      </Toolbar>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={'/'} sx={{ color: 'primary.main', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
            <ListItemIcon sx={colorIconSx}>
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Home" sx={{...colorButtonSx, fontWeigh:'900'}} />}
            </ListItemButton>
        </ListItem>

        {isLoggedIn && (
          <>
            {!isCandidate && <ListItem disablePadding>
              <ListItemButton component={Link} to={'/recruiter'} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                <ListItemIcon sx={colorIconSx}>
                  <PersonSearchIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Recruiter Dashboard" sx={colorButtonSx} />}
              </ListItemButton>
            </ListItem>
            }
            {!isRecruiter && <ListItem disablePadding>
              <ListItemButton component={Link} to={'/candidate'} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                <ListItemIcon sx={colorIconSx}>
                  <QueryStatsIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Candidate Dashboard" sx={colorButtonSx} />}
              </ListItemButton>
            </ListItem>
            }
            {isRecruiter && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={'/recruiter/job'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                    <ListItemIcon sx={colorIconSx}>
                      <WorkIcon />
                    </ListItemIcon>
                    {open && <ListItemText sx={colorButtonSx} primary="Jobs Dashboard" />}
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={'/recruiter/job/add'}>
                    <ListItemIcon sx={colorIconSx}>
                      <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Job" sx={colorButtonSx} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={'/recruiter/favorites'}>
                    <ListItemIcon sx={colorIconSx}>
                      <StarRateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Review Applicants" sx={colorButtonSx} />
                  </ListItemButton>
                </ListItem></>
            )}
            {isCandidate && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to={'/candidate/job'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                  <ListItemIcon sx={colorIconSx}>
                    <WorkIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="View Jobs" sx={colorButtonSx} />}
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                <ListItemIcon sx={{color:'error.main'}}>
                  <ExitToAppIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Logout" sx={colorButtonSx} />}
              </ListItemButton>
            </ListItem>
          </>
        )}

        {!isLoggedIn && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={'/login'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                <ListItemIcon sx={colorIconSx}>
                  <LoginIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Login" sx={colorButtonSx} />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={'/register'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                <ListItemIcon sx={colorIconSx}>
                  <PersonAddIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Register" sx={colorButtonSx} />}
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      {open && (
        <img src={ProfitLogo} style={{
          boxShadow: '#ffffffc2 10px 0px 15px',
          height: '260px',
          width: '240px',
          position: 'absolute',
          bottom: '0px',
          padding: '40px'
        }} />
      )}
    </Drawer>

    {/* כפתור פתיחה במובייל */}
    <IconButton
      onClick={toggleDrawer}
      sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', top: 16, left: 16, color: 'white' }}
    >
      <ChevronLeftIcon sx={{ transform: drawerOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
    </IconButton>
  </>
);
};

export default Sidebar;
