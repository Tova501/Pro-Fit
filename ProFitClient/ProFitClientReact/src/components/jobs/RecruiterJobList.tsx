import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchJobs, toggleJobStatus, removeJob } from '../../redux/slices/jobSlice';
import { Box, Typography, Grid, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import RecruiterJobCard from './RecruiterJobCard';
import DeleteJobDialog from './DeleteJobDialog';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import JobActionsMenu from './JobActionsMenu';

const RecruiterJobList = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const jobs = useSelector((state: RootState) => state.job.jobs);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    const handleToggleStatus = async (jobId: number, isActive: boolean) => {
        try {
            await dispatch(toggleJobStatus({ jobId, isActive: !isActive }));
        } catch (error) {
            console.error('Error toggling job status:', error);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, jobId: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedJobId(jobId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDelete = async () => {
        if (selectedJobId !== null) {
            try {
                await dispatch(removeJob(selectedJobId));
                setDeleteDialogOpen(false);
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            {/* כותרת */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'primary.main',
                    marginBottom: 3,
                }}
            >
                Job Management Dashboard
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    marginBottom: 4,
                }}
            >
                Manage your job postings efficiently. Add, edit, or deactivate jobs as needed.
            </Typography>

            {/* תפריט פעולות */}
            <JobActionsMenu />

            {/* רשימת משרות */}
            <Grid container spacing={3}>
                {jobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <RecruiterJobCard
                            job={job}
                            onToggleStatus={handleToggleStatus}
                            onMenuOpen={handleMenuOpen}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* תפריט */}
            <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => navigate(`/recruiter/job/${selectedJobId}/applications`)}>
                    View Applications
                </MenuItem>
                <MenuItem onClick={() => navigate(`/recruiter/job/edit/${selectedJobId}`)}>
                    Edit Job
                </MenuItem>
                <MenuItem onClick={handleDeleteDialogOpen}>
                    Delete Job
                </MenuItem>
            </Menu>

            {/* הודעה */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#fff3e0',
                    padding: 2,
                    borderRadius: '8px',
                    marginTop: 4,
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                }}
            >
                <WarningAmberIcon sx={{ color: '#ff9800', marginRight: 1 }} />
                <Typography
                    variant="body2"
                    sx={{
                        color: '#333',
                    }}
                >
                    To temporarily disable applications for a job, mark it as inactive. You can reactivate it anytime to make it available again.
                </Typography>
            </Box>
        </Box>
    );
};

export default RecruiterJobList;