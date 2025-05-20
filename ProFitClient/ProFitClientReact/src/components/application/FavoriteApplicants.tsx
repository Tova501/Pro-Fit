import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { Box, Typography, Container, Button } from '@mui/material';
import { fetchApplications, markAsFavorite, unmarkAsFavorite } from '../../redux/slices/applicationSlice';
import ApplicantCard from './ApplicationCard';
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

  const handleToggleFavorite = (id: number, isFavorite: boolean) => {
    if (isFavorite) {
      dispatch(unmarkAsFavorite(id));
    } else {
      dispatch(markAsFavorite(id));
    }
  };

  const handleViewMore = (id: number) => {
    navigate(`${id}`);
  };

  const handleSendEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleBackToJobs = () => {
    navigate('/recruiter/job');
  };

  return (
    <Container>
      <Box
        sx={{
          padding: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#F9FAFB',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* כותרת */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#284670',
            textAlign: 'center',
            marginBottom: 3,
          }}
        >
          Your Favorite Applicants
        </Typography>

        {/* רשימת מועמדים */}
        {favoriteApplicants.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              textAlign: 'center',
              marginTop: 5,
            }}
          >
            You currently have no favorite applicants. Start exploring and add your favorite candidates here!
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {favoriteApplicants.map((application) => (
              <ApplicantCard
                key={application.id}
                application={application}
                onToggleFavorite={handleToggleFavorite}
                onViewMore={handleViewMore}
                onSendEmail={handleSendEmail}
              />
            ))}
          </Box>
        )}
                      {/* כפתור חזרה */}
                      <Box textAlign="center" marginBottom={3}>
          <Button
            variant="contained"
            onClick={handleBackToJobs}
            sx={{
              backgroundColor: '#284670',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              marginTop: '24px',
              '&:hover': { backgroundColor: '#1f3550' },
            }}
          >
            Back to Job Listings
          </Button>
        </Box>
      </Box>

    </Container>
  );
};

export default FavoriteApplicants;