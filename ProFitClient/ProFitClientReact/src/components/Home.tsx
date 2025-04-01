import { Container, Box, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <Box className="home-container">
        <Typography className="home-title" component="h1">
          Empower Your Future
        </Typography>
        <Typography className="home-subtitle" component="p">
          A platform designed to connect top talent with leading organizations. Whether you're building your dream team or taking the next step in your career, we've got you covered.
        </Typography>
      </Box>
      <Box className="home-box-container">
        {/* Feature for Recruiters */}
        <Card className="home-card recruiter-card" onClick={() => handleNavigate('/recruiter')}>
          <WorkOutlineIcon className="home-card-icon" />
          <Typography className="home-card-title">
            Build Your Dream Team
          </Typography>
          <Typography className="home-card-text">
            Discover top talent, streamline your hiring process, and achieve your recruitment goals effortlessly.
          </Typography>
        </Card>

        {/* Feature for Candidates */}
        <Card className="home-card candidate-card" onClick={() => handleNavigate('/candidate')}>
          <PersonOutlineIcon className="home-card-icon" />
          <Typography className="home-card-title">
            Unlock Your Potential
          </Typography>
          <Typography className="home-card-text">
            Explore opportunities, showcase your skills, and take the next step in your professional journey.
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
