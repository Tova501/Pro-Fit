import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Auth from './authentication/Auth'; 

const Navbar: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);

  const handleOpenAuth = () => {
    setAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthOpen(false);
  };

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ProFit
        </Typography>
          Home
        </Button>
          <Button color="inherit" component={Link} to={'/job'}>
            View Jobs
          </Button>
          <Button color="inherit" onClick={handleOpenAuth}>Login</Button>
          <Button color="inherit" onClick={handleOpenAuth}>Register</Button>
      </Toolbar>
    </AppBar>
      <Auth open={authOpen} onClose={handleCloseAuth} />
    </>
  );
};

export default Navbar;