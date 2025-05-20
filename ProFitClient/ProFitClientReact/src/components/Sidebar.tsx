import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import { logoutUser } from '../redux/slices/userSlice';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AvatarProfile from './Avatar';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isRecruiter = location.pathname.includes('recruiter');
  const isCandidate = location.pathname.includes('candidate');
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const [open, setOpen] = useState(false); // מצב פתיחה של הסיידבר
  const [drawerOpen, setDrawerOpen] = useState(false); // מצב פתיחה לדרואו במובייל

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: open ? 240 : 60, // רוחב משתנה
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? 240 : 60,
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
            color: 'white',
            transition: 'width 0.3s',
            // overflow: open ? 'hidden' : 'auto',
            overflow: 'hidden'
          },
        }}
      >
        <Toolbar sx={{ zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 3, marginBottom: 2, color: 'white' }}>
          <Button component={Link} to={'/'} sx={{ padding: 0, marginBottom: 1 }}>

          </Button>
          {open}
          <IconButton onClick={toggleSidebar} sx={{ width: '40px', color: 'white', position: 'absolute', top: 16, right: 10 }}>
            <ChevronLeftIcon sx={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }} />
          </IconButton>
        </Toolbar>

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={'/'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <HomeIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Home" />}
            </ListItemButton>
          </ListItem>

          {isLoggedIn && (
            <>
              {isRecruiter && (
                <><ListItem disablePadding>
                  <ListItemButton component={Link} to={'/recruiter/job'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <WorkIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary="Jobs Dashboard" />}
                  </ListItemButton>
                </ListItem><ListItem disablePadding>
                    <ListItemButton component={Link} to={'/recruiter/job/add'}>
                      <ListItemIcon sx={{ color: 'white' }}>
                        <AddCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Job" />
                    </ListItemButton>
                  </ListItem></>
              )}
              {isCandidate && (
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={'/candidate/job'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <WorkIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary="View Jobs" />}
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Logout" />}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                {open && <AvatarProfile />}
              </ListItem>
            </>
          )}

          {!isLoggedIn && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to={'/login'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <LoginIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Login" />}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to={'/register'} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <PersonAddIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Register" />}
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
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
