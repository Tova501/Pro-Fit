import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchApplications, markAsFavorite, unmarkAsFavorite } from '../../redux/slices/applicationSlice';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import ApplicantCard from './ApplicationCard';

const Applications = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { applications, loading, error } = useSelector((state: RootState) => state.application);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchApplications(Number(jobId)));
    }
  }, [dispatch, jobId]);

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      {/* כותרת */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          color: 'primary.main',
          marginBottom: 3,
        }}
      >
        Applications for Job #{jobId}
      </Typography>

      {/* רשימת המועמדים */}
      <Box display="flex" flexDirection="column" gap={2}>
        {applications.map((application) => (
          <ApplicantCard
            key={application.id}
            application={application}
            onToggleFavorite={handleToggleFavorite}
            onViewMore={handleViewMore}
            onSendEmail={handleSendEmail}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Applications;