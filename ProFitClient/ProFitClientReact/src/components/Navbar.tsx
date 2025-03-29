import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Auth from './authentication/Auth';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import { logoutUser } from '../redux/slices/userSlice';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isRecruiter = location.pathname.includes('recruiter');
  const isCandidate = location.pathname.includes('candidate');
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [authOpen, setAuthOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenAuth = () => {
    setAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProFit
          </Typography>
          <Button color="inherit" component={Link} to={'/'}>
            Home
          </Button>
          {isLoggedIn && (
            <>
              {isRecruiter && (
                <Button color="inherit" component={Link} to={'/recruiter/job'}>
                  Manage Jobs
                </Button>
              )}
              {isCandidate && (
                <Button color="inherit" component={Link} to={'/candidate/job'}>
                  View Jobs
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Button color="inherit" onClick={handleOpenAuth}>
                Login
              </Button>
              <Button color="inherit" onClick={handleOpenAuth}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Auth open={authOpen} onClose={handleCloseAuth} />
    </>
  );
};

export default Navbar;