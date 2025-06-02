import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { fetchApplications } from '../../redux/slices/applicationSlice';
import ApplicationCard from './ApplicationCard';
import { useNavigate } from 'react-router';

const FavoriteApplicants: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const applications = useSelector((state: RootState) => state.application.applications);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const favoriteApplicants = Array.isArray(applications)
    ? applications.filter((application) => application.isFavorite)
    : [];

  const handleViewMore = (id: number) => {
    navigate(`${id}`);
  };

  const handleBackToJobs = () => {
    navigate('/recruiter/job');
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      {/* כותרת */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginBottom: 4,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Your Favorite Applicants
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: 1 }}>
          Manage your favorite candidates for quick access.
        </Typography>
      </Paper>

      {/* רשימת מועמדים */}
      {favoriteApplicants.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            marginTop: 5,
          }}
        >
          You currently have no favorite applicants. Start exploring and add your favorite candidates here!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favoriteApplicants.map((application) => (
            <Grid item xs={12} sm={6} md={4} key={application.id}>
              <ApplicationCard application={application} onViewMore={handleViewMore} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* כפתור חזרה */}
      <Box textAlign="center" marginTop={4}>
        <Button
          variant="contained"
          onClick={handleBackToJobs}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { backgroundColor: '#1f3550' },
          }}
        >
          Back to Job Listings
        </Button>
      </Box>
    </Container>
  );
};

export default FavoriteApplicants;