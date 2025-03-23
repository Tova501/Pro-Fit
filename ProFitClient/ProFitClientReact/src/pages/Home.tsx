import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import '../styles/Home.css';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Box className="hero" sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to ProFit
          </Typography>
          <Typography variant="h5" component="p" color="textSecondary">
            Your ultimate tool for analyzing CVs and matching them to job opportunities.
          </Typography>
        </Box>
        <Grid container spacing={4} className="features">
          <Grid item xs={12} md={4}>
            <Paper className="feature" sx={{ p: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Analyze CVs
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Use our advanced algorithms to analyze CVs and extract key information.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="feature" sx={{ p: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Match to Jobs
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Find the best job matches for candidates based on their skills and experience.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="feature" sx={{ p: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Improve Hiring
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Streamline your hiring process and make better hiring decisions.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;