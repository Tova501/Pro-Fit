import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchApplications } from '../../redux/slices/applicationSlice';
import { Container, Typography, Box, CircularProgress, Grid, Paper } from '@mui/material';
import ApplicationCard from './ApplicationCard';

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

  const handleViewMore = (id: number) => {
    navigate(`${id}`);
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
        <Typography color="error" variant="h6">
          Oops! Something went wrong. Please try again later.
        </Typography>
      </Box>
    );
  }

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
          Applications for Job #{jobId}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: 1 }}>
          Review and manage all applications for this job posting.
        </Typography>
      </Paper>

      {/* רשימת המועמדים */}
      {applications.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            marginTop: 5,
          }}
        >
          No applications found for this job. Check back later!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {applications.map((application) => (
            <Grid item xs={12} sm={6} md={4} key={application.id}>
              <ApplicationCard application={application} onViewMore={handleViewMore} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Applications;