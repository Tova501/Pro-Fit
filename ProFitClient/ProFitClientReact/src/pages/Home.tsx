import { Container, Box, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ProfitLogo from '../assets/proFitLogo.png';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleNavigate = (path: string): void => {
    if(isLoggedIn == true)
      navigate(path);
  };

  return (

    <Container
      maxWidth="lg"
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        height: '100vh', 
      }}
    >
      {/* לוגו וכותרת */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={ProfitLogo}
            alt="Profit Logo"
            style={{
              width: '90%',
              height: '90%',
              objectFit: 'contain', // מבטיח שכל התמונה, כולל הכיתוב, תיכנס לעיגול
              objectPosition: 'center', // ממקם את התמונה במרכז
            }}
          />
        </Box>
        
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#1d3557',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            marginTop: 2, // ריווח בין התמונה לכותרת
          }}
        >
          Empower Your Future
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#555',
            maxWidth: '800px',
            fontWeight: 400,
          }}
        >
          A platform designed to connect top talent with leading organizations.
          Whether you're building your dream team or taking the next step in your
          career, we've got you covered.
        </Typography>
      </Box>

      {/* כרטיסים למגייסים ומועמדים */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 4,
          width: '100%',
        }}
      >
        {/* כרטיס למגייסים */}
        <Card
          onClick={() => handleNavigate('/recruiter')}
          sx={{
            cursor: 'pointer',
            background: '#ffffff',
            borderRadius: 10,
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: 50, color: '#1d3557' }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#1d3557',
              marginTop: 2,
            }}
          >
            Build Your Dream Team
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              marginTop: 1,
              fontWeight: 400,
            }}
          >
            Discover top talent, streamline your hiring process, and achieve your
            recruitment goals effortlessly.
          </Typography>
        </Card>

        {/* כרטיס למועמדים */}
        <Card
          onClick={() => handleNavigate('/candidate')}
          sx={{
            cursor: 'pointer',
            background: '#ffffff',
            borderRadius: 10,
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <PersonOutlineIcon sx={{ fontSize: 50, color: '#DFA021' }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#1d3557',
              marginTop: 2,
            }}
          >
            Unlock Your Potential
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              marginTop: 1,
              fontWeight: 400,
            }}
          >
            Explore opportunities, showcase your skills, and take the next step
            in your professional journey.
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
