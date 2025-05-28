import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Container, Typography, Card, CardContent, Avatar, CircularProgress, Tooltip, Box, Snackbar, Alert } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmailIcon from '@mui/icons-material/Email';
import { Application } from '../../models/applicationType';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { markAsFavorite, unmarkAsFavorite } from '../../redux/slices/applicationSlice';
import CVFile from '../cv/CVFile';
import gmailService from '../../services/gmailService';

const Applicant = () => {
  const dispatch: AppDispatch = useDispatch();
  const { applicationId } = useParams<{ applicationId: string }>();
  const application: Application | null = useSelector(
    (state: any) => state.application.applications.find(
      (app: Application) => app.id === Number(applicationId))
  );
  const { error, loading } = useSelector((state: any) => state.application);

  const [isSaving, setIsSaving] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ success: boolean; message: string } | null>(null);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!application) {
    return <Typography color="error">Application not found.</Typography>;
  }

  const handleToggleSave = async () => {
    setIsSaving(true);
    try {
      if (application.isFavorite) {
        await dispatch(unmarkAsFavorite(application.id));
      } else {
        await dispatch(markAsFavorite(application.id));
      }
    } catch (err) {
      console.error('Failed to update favorite status:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendEmail = async () => {
    try {
      await gmailService.sendEmail(
        application.user.email,
        'Job Opportunity',
        'Dear Candidate,\n\nWe are excited to discuss a potential job opportunity with you.\n\nBest regards,\nYour Company'
      );
      setEmailStatus({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setEmailStatus({ success: false, message: 'Failed to send email. Please try again later.' });
    }
  };

  return (
    <Container>
      {/* כותרת ידידותית */}
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'start', fontWeight: 600, marginBottom: 1 }}>
        Candidate Details
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'start', color: 'text.secondary', marginBottom: 3, fontStyle: 'italic' }}>
        Discover detailed insights about this candidate and his qualifications.
      </Typography>

      {/* כרטיס המועמד */}
      <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', marginBottom: 3 }}>
        <Avatar sx={{ width: 48, height: 48, marginRight: 2, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
          {application.user.firstName[0]}
          {application.user.lastName[0]}
        </Avatar>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {application.user.firstName} {application.user.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Email: {application.user.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Score: {application.score}
          </Typography>
        </CardContent>

        {/* אייקונים בצד אחד מעל השני */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Tooltip title={application.isFavorite ? "Unsave this candidate" : "Save this candidate for later review"} arrow>
            <IconButton onClick={handleToggleSave} sx={{ color: application.isFavorite ? 'gold' : 'gray' }} disabled={isSaving}>
              {isSaving ? <CircularProgress size={24} /> : application.isFavorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Send an email to the candidate" arrow>
            <IconButton onClick={handleSendEmail} sx={{ color: 'primary.main' }}>
              <EmailIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>

      {/* קובץ קורות חיים */}
      <CVFile id={application.cv.id} />

      {emailStatus && (
        <Snackbar
          open={!!emailStatus}
          autoHideDuration={6000}
          onClose={() => setEmailStatus(null)}
        >
          <Alert
            onClose={() => setEmailStatus(null)}
            severity={emailStatus.success ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {emailStatus.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Applicant;
