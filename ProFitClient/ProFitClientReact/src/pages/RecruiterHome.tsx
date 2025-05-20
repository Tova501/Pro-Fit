import { Box, IconButton, Typography, Grid, Card } from '@mui/material';
import { WorkOutline, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RecruiterHome = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: '50px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#F3F4F6',
      }}
    >
      {/* כותרת ראשית */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: '#284670',
          marginBottom: 3,
        }}
      >
        Recruiter Dashboard
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#555',
          marginBottom: 5,
        }}
      >
        Manage job postings, review candidates, and streamline your hiring process.
      </Typography>

      {/* סטטיסטיקות */}
      <Grid container spacing={4} sx={{ marginBottom: 5 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#284670' }}>
              12
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Active Jobs
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#284670' }}>
              45
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Candidates
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#284670' }}>
              5
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Pending Reviews
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* כרטיסים */}
      <Grid container spacing={4}>
        {/* ניהול משרות */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: '40px 30px',
              borderRadius: '8px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              minHeight: '250px', // גובה אחיד
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <IconButton
              onClick={() => navigate('/recruiter/job')}
              sx={{
                backgroundColor: '#284670',
                padding: '16px',
                borderRadius: '50%',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <WorkOutline sx={{ color: '#fff', fontSize: '2rem' }} />
            </IconButton>
            <Typography variant="h5" sx={{ marginTop: 2, fontWeight: 600 }}>
              Manage Job Postings
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                marginTop: 1,
              }}
            >
              Create, edit, and manage your job postings to attract top talent.
            </Typography>
          </Card>
        </Grid>

        {/* צפייה במועמדים */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: '40px 30px',
              borderRadius: '8px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              minHeight: '250px', // גובה אחיד
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <IconButton
              onClick={() => navigate('/recruiter/favorites')}
              sx={{
                backgroundColor: '#DFA122',
                padding: '16px',
                borderRadius: '50%',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Visibility sx={{ color: '#fff', fontSize: '2rem' }} />
            </IconButton>
            <Typography variant="h5" sx={{ marginTop: 2, fontWeight: 600 }}>
              Review Candidates
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                marginTop: 1,
              }}
            >
              View and evaluate candidates for your job postings.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecruiterHome;
