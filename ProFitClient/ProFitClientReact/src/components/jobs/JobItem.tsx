import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Card, CardContent, Typography, Box, Chip, Divider } from '@mui/material';
import { Job } from '../../models/jobTypes';
import ApplyingToJobDialog from './ApplyingToJobDialog';

const JobItem: React.FC = () => {
  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job: Job | undefined = useSelector((state: RootState) =>
    state.job.jobs.find((job) => job.id === Number(id))
  );

  if (!job) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 4 }}>
        Job not found.
      </Typography>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {job.title}
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
          {job.company}
        </Typography>
        <Chip label={job.location} color="primary" size="small" sx={{ marginBottom: 2 }} />
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {job.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Years of Experience Required:</strong> {job.yearsOfExperienceRequired}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Requirements:</strong> {job.requirements}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Skills:</strong> {job.skills}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenUploadDialog(true)}
          sx={{ textTransform: 'none' }}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ textTransform: 'none' }}
        >
          Back
        </Button>
      </Box>

      {openUploadDialog && (
        <ApplyingToJobDialog
          open={openUploadDialog}
          onClose={() => setOpenUploadDialog(false)}
          jobId={job.id}
        />
      )}
    </Card>
  );
};

export default JobItem;