import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchJobs, toggleJobStatus, removeJob } from '../../redux/slices/jobSlice';
import { Box, Typography, Menu, MenuItem } from '@mui/material';
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
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    marginBottom: 1,
                    color: 'primary.main',
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

            <JobActionsMenu />

            {jobs.length > 0 && <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                justifyContent="center"
                sx={{
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                {jobs.map((job) => (
                    <RecruiterJobCard
                        key={job.id}
                        job={job}
                        onToggleStatus={handleToggleStatus}
                        onMenuOpen={handleMenuOpen}
                    />
                ))}
            </Box>}

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

            <DeleteJobDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                onDelete={handleDelete}
            />

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