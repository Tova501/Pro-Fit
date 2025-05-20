import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Card, CardContent, Typography, Box, Tooltip, IconButton, Alert } from '@mui/material';
import swal from 'sweetalert2';
import { applyToJob, applyToJobWithCV, getPresignedUrlForCV } from '../../services/jobService';
import { useEffect, useState } from 'react';
import { fetchJobs } from '../../redux/slices/jobSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UploadCV from '../UploadCV';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const CandidateJobList = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const jobs = useSelector((state: RootState) => state.job.jobs);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const dispatch = useDispatch<AppDispatch>();
    const [openUploadCV, setOpenUploadCV] = useState(false);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    const handleApply = async (jobId: number) => {
        if (!user?.hasUploadedGeneralCV) {
            setErrorMessage("You must upload a CV before applying for jobs.");
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
            setErrorMessage("Error applying to job. Please try again later.");
        }
    };

    const handleApplyWithCV = async (jobId: number, file: File) => {
        try {

            const contentType = file.type;
            const presignedUrl = await getPresignedUrlForCV(jobId, contentType);

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
            setErrorMessage("Error applying to job. Please try again later.");
        }
    };

    return (
        <Box display="flex" flexWrap="wrap" gap={2}>
            {jobs.map((job) => (
                <Card key={job.id} sx={{ width: 300, boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{job.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {job.description}
                        </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="flex-start" p={2}>
                        <Tooltip title="View Job" arrow>
                            <IconButton onClick={() => navigate(`/candidate/job/${job.id}`)}>
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Apply" arrow>
                            <IconButton onClick={() => handleApply(job.id)}>
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            onClick={() => setOpenUploadCV(true)} 
                            title="Apply with CV" 
                            arrow>
                            <IconButton>
                                <UploadFileIcon />
                                <UploadCV
                                    onUpload={(file: File) => handleApplyWithCV(job.id, file)}
                                    open={openUploadCV}
                                    onClose={() => setOpenUploadCV(false)}
                                />
                            </IconButton>
                        </Tooltip>
                    {errorMessage && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} icon={<ErrorOutlineIcon fontSize="small" />}>
                            {errorMessage}
                        </Alert>
                    )}
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default CandidateJobList;
