import { Box, Grid, Typography } from '@mui/material';
import { Search, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ActionCard from '../components/common/ActionCard';

const CandidateHome = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Page Title and Description */}
      <Box
        sx={{
          padding: '30px 20px',
          backgroundColor: '#284670',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 2 }}>
          Welcome to Your Career Dashboard
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'white' }}>
          Explore opportunities, update your profile, and discover tools to boost your career.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          padding: '50px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: '#F3F4F6',
        }}
      >
        {/* Action Cards */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ActionCard
              title="Search Jobs"
              description="Explore opportunities that match your skills and interests."
              icon={<Search sx={{ color: '#fff', fontSize: '2rem' }} />}
              onClick={() => navigate('job')}
              backgroundColor="#DFA122"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActionCard
              title="Update Profile & Upload CV"
              description="Update your personal details and upload your CV to stand out."
              icon={<Person sx={{ color: '#fff', fontSize: '2rem' }} />}
              onClick={() => navigate('/profile')}
              backgroundColor="#284670"
            />
          </Grid>
        </Grid>

        {/* Features Coming Soon */}
        <Box
          sx={{
            marginTop: '50px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 3, color: '#284670' }}>
            Features Coming Soon
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  padding: '20px',
                  textAlign: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
                  AI Job Matching
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Get personalized job recommendations powered by AI.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  padding: '20px',
                  textAlign: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
                  Interview Preparation
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Access tools and tips to ace your interviews.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  padding: '20px',
                  textAlign: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
                  Career Insights
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Explore industry trends and career advice.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateHome;
