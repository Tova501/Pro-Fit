import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Card, CardContent, Typography, Box, Button, Modal, Alert } from '@mui/material';
import { fetchJobs } from '../../redux/slices/jobSlice';
import ApplyingToJobDialog from './ApplyingToJobDialog';
import { useNavigate } from 'react-router';

const CandidateJobList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleApply = (jobId: number) => {
    setSelectedJobId(jobId);
    setOpenModal(true);
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {jobs.map((job) => (
        <Card key={job.id} sx={{ width: 300, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {job.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {job.description}
            </Typography>
          </CardContent>
          <Box display="flex" justifyContent="center" p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleApply(job.id)}
            >
              Apply
            </Button>
                        <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`${job.id}`)}
            >
              View
            </Button>
          </Box>
        </Card>
      ))}

      <ApplyingToJobDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        jobId={selectedJobId || 0}
      />

      {/* Modal */}
      {/* <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 400,
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Apply for Job
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 3 }}>
            You can continue without uploading a CV or upload a custom CV for this job.
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinueWithoutCV}
            >
              Continue Without CV
            </Button>
            {/* <UploadCV
              open={openModal}
              onClose={() => setOpenModal(false)}
              onUpload={handleUploadCV}
            /> */}
      {/* </Box>
        </Box>
      </Modal> */}


    </Box>
  );
};

export default CandidateJobList;
