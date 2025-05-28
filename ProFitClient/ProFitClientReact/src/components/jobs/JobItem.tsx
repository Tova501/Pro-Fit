import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Card, CardContent, Typography, Box, Divider, IconButton, Tooltip } from '@mui/material';
import { Job } from '../../models/jobTypes';
import ApplyingToJobDialog from './ApplyingToJobDialog';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';

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
        <Card
            sx={{
                maxWidth: 1000, // Increased width
                margin: 'auto',
                mt: 6, // Increased top margin
                p: 4, // Increased padding
                boxShadow: 4, // Slightly deeper shadow
                borderRadius: 3, // Slightly more rounded corners
            }}
        >
            <CardContent>
                {/* Job Title and Actions */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        {job.title}
                    </Typography>
                    <Box>
                        <Tooltip title="Save Job">
                            <IconButton>
                                <BookmarkBorderIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Share Job">
                            <IconButton>
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Company and Location */}
                <Box display="flex" alignItems="center" gap={3} mb={3}>
                    <Typography variant="h5" color="textSecondary" display="flex" alignItems="center" gap={1}>
                        <BusinessIcon fontSize="medium" /> {job.company}
                    </Typography>
                    <Typography variant="h5" color="textSecondary" display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon fontSize="medium" /> {job.location}
                    </Typography>
                </Box>

                {/* Divider */}
                <Divider sx={{ marginY: 3 }} />

                {/* Job Details */}
                <Typography variant="body1" sx={{ marginBottom: 3, lineHeight: 1.8 }}>
                    {job.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                    <strong>Years of Experience Required:</strong> {job.yearsOfExperienceRequired}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                    <strong>Requirements:</strong> {job.requirements}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                    <strong>Skills:</strong> {job.skills}
                </Typography>
            </CardContent>

            {/* Actions */}
            <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenUploadDialog(true)}
                    sx={{ textTransform: 'none', fontSize: '1rem', padding: '10px 20px' }}
                >
                    Apply Now
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(-1)}
                    sx={{ textTransform: 'none', fontSize: '1rem', padding: '10px 20px' }}
                >
                    Back
                </Button>
            </Box>

            {/* Apply Dialog */}
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