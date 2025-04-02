import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
import '../styles/Navbar.css';
import AvatarProfile from './Avatar';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isRecruiter = location.pathname.includes('recruiter');
  const isCandidate = location.pathname.includes('candidate');
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProFit
          </Typography>

          <Button className="nav-button" component={Link} to={'/'}>
            <HomeIcon /> Home
          </Button>
          {isLoggedIn && (
            <>
              {isRecruiter && (
                <Button className="nav-button" component={Link} to={'/recruiter/job'}>
                  <WorkIcon /> Manage Jobs
                </Button>
              )}
              {isCandidate && (
                <Button className="nav-button" component={Link} to={'/candidate/job'}>
                  <WorkIcon /> View Jobs
                </Button>
              )}
              <Button className="nav-button logout-button" onClick={handleLogout}>
                <ExitToAppIcon /> Logout
              </Button>
              <AvatarProfile />
            </>
          )}
          {!isLoggedIn && (
            <>
              <Button className="nav-button" component={Link} to={'/login'}>
                <LoginIcon /> Login
              </Button>
              <Button className="nav-button" component={Link} to={'/register'}>
                <PersonAddIcon /> Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
