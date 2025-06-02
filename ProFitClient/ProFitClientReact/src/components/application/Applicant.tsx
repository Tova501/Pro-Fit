import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Divider } from '@mui/material';
import { Application } from '../../models/applicationType';
import { useSelector } from 'react-redux';
import CVFile from '../cv/CVFile';
import ApplicationCard from './ApplicationCard';

const Applicant = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const application: Application | null = useSelector(
    (state: any) =>
      state.application.applications.find((app: Application) => app.id === Number(applicationId))
  );
  const { error, loading } = useSelector((state: any) => state.application);

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

  if (!application) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <Typography color="error" variant="h6">
          Application not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ paddingY: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      {/* כותרת */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Candidate Details
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: 1 }}>
          Discover detailed insights about this candidate and their qualifications.
        </Typography>
      </Box>

      {/* כרטיס מועמד */}
      <Box sx={{ marginBottom: 4 }}>
        <ApplicationCard application={application} />
      </Box>

      {/* מפריד */}
      <Divider sx={{ marginY: 4 }} />

      {/* קובץ קורות חיים */}
      <Box>
        <CVFile id={application.cv.id} />
      </Box>
    </Container>
  );
};

export default Applicant;
