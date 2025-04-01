import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import swal from 'sweetalert2';
import { applyToJob, applyToJobWithCV, getPresignedUrlForCV } from '../../services/jobService';
import { Job } from '../../models/jobTypes';
import User from '../../models/userType';

const JobItem: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const job: Job | undefined = useSelector((state: RootState) =>
        state.job.jobs.find((job) => job.id === Number(id))
    );
    const user: User | null = useSelector((state: RootState) => state.user.currentUser);

    if (!job) {
        return (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 4 }}>
                Job not found.
            </Typography>
        );
    }

    const handleApply = async () => {
        if (!user?.hasUploadedGeneralCV) {
            swal.fire({
                title: 'Error',
                text: 'You must upload a general CV before applying.',
                icon: 'error',
            });
            return;
        }

        try {
            await applyToJob(job.id);
            swal.fire({
                title: 'Application submitted successfully!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            swal.fire({
                title: 'Error',
                text: 'Failed to apply for the job. Please try again later.',
                icon: 'error',
            });
        }
    };

    const handleApplyWithCV = async () => {
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
            const presignedUrl = await getPresignedUrlForCV(job.id, contentType);

            // Upload the file to S3 using the presigned URL
            await fetch(presignedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': contentType,
                },
            });

            await applyToJobWithCV(job.id, contentType);
            swal.fire({
                title: 'Application with CV submitted successfully!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
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
        <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {job.title}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Company: {job.company}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {job.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Location: {job.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Years of Experience Required: {job.yearsOfExperienceRequired}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Requirements: {job.requirements}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Skills: {job.skills}
                </Typography>
            </CardContent>
            <Box display="flex" flexDirection="column" gap={2} p={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApply}
                >
                    Apply
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleApplyWithCV}
                >
                    Apply with CV
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </Box>
        </Card>
    );
};

export default JobItem;