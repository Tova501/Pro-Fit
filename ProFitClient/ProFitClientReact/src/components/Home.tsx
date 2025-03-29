import { Container, Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <Box
        sx={{
          my: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to ProFit
        </Typography>
        <Typography variant="h5" component="p" color="textSecondary">
          Your ultimate tool for recruiters and candidates.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          flexWrap: 'wrap',
          mt: 4,
        }}
      >
        {/* ריבוע עבור מגייסים */}
        <Card
          sx={{
            width: 300,
            height: 200,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
          }}
          onClick={() => handleNavigate('/recruiter')}
        >
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              For Recruiters
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage job postings, review candidates, and streamline your hiring process.
            </Typography>
          </CardContent>
        </Card>

        {/* ריבוע עבור מועמדים */}
        <Card
          sx={{
            width: 300,
            height: 200,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
          }}
          onClick={() => handleNavigate('/candidate')}
        >
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              For Candidates
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Upload your CV, find job opportunities, and track your applications.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
