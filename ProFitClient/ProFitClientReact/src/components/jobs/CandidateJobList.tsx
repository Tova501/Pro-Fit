import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import swal from 'sweetalert2';
import { applyToJob, applyToJobWithCV, getPresignedUrlForCV } from '../../services/jobService';
import { useEffect } from 'react';
import { fetchJobs } from '../../redux/slices/jobSlice';

const CandidateJobList = () => {
    const navigate = useNavigate();
    const jobs = useSelector((state: RootState) => state.job.jobs);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchJobs());
        console.log("disppatch jobs");
    }, [dispatch]);

    const handleApply = async (jobId: number) => {
        if (!user?.hasUploadedGeneralCV) {
            swal.fire({
                title: 'Error',
                text: 'You must upload a general CV before applying.',
                icon: 'error',
            });
            return;
        }

        try {
            await applyToJob(jobId);
            swal.fire({
                title: 'Application submitted successfully!',
                icon: 'success',
                timer: 2000,
            });
        } catch (error) {
            swal.fire({
                title: 'Error',
                text: 'Failed to apply for the job. Please try again later.',
                icon: 'error',
            });
        }
    };

    const handleApplyWithCV = async (jobId: number) => {
        try {
            const { value: file } = await swal.fire({
                title: 'Upload your CV',
                input: 'file',
                inputAttributes: {
                    accept: '.pdf,.doc,.docx',
                    'aria-label': 'Upload your CV',
                },
                showCancelButton: true,
            });

            if (!file) {
                swal.fire({
                    title: 'No file selected',
                    text: 'You must select a file to apply with CV.',
                    icon: 'warning',
                });
                return;
            }

            const contentType = file.type;
            const presignedUrl = await getPresignedUrlForCV(jobId, contentType);

            // Upload the file to S3 using the presigned URL
            await fetch(presignedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': contentType,
                },
            });

            await applyToJobWithCV(jobId, contentType);
            swal.fire({
                title: 'Application with CV submitted successfully!',
                icon: 'success',
                timer: 2000,
            });
        } catch (error) {
            swal.fire({
                title: 'Error',
                text: 'Failed to apply with CV. Please try again later.',
                icon: 'error',
            });
        }
    };

    return (
        <Box display="flex" flexWrap="wrap" gap={2}>
            {jobs.map((job) => (
                <Card key={job.id} sx={{ width: 300 }}>
                    <CardContent>
                        <Typography variant="h6">{job.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {job.description}
                        </Typography>
                    </CardContent>
                    <Box display="flex" flexDirection="column" gap={1} p={2}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate(`/candidate/job/${job.id}`)}
                        >
                            View
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleApply(job.id)}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleApplyWithCV(job.id)}
                        >
                            Apply with CV
                        </Button>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default CandidateJobList;