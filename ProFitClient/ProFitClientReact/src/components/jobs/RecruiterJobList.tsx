import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchJobs, removeJob } from '../../redux/slices/jobSlice';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import swal from 'sweetalert2';
import { useEffect } from 'react';

const RecruiterJobList = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const jobs = useSelector((state: RootState) => state.job.jobs);

    useEffect(() => {
        dispatch(fetchJobs());
        console.log("Fetching jobs for recruiter");
    }, [dispatch]);

    const handleDelete = async (jobId: number) => {
        try {
            await dispatch(removeJob(jobId));
            swal.fire({
                title: 'Job deleted successfully!',
                icon: 'success',
                timer: 2000,
            });
        } catch (error) {
            swal.fire({
                title: 'Error deleting job',
                text: 'Please try again later.',
                icon: 'error',
            });
        }
    };

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/recruiter/job/add')}
                sx={{ mb: 2 }}
            >
                Add New Job
            </Button>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {jobs.map((job) => (
                    <Card key={job.id} sx={{ width: 300 }}>
                        <CardContent>
                            <Typography variant="h6">{job.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {job.description}
                            </Typography>
                        </CardContent>
                        <Box display="flex" justifyContent="space-between" p={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => navigate(`/recruiter/job/${job.id}/applications`)}
                            >
                                Applications
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => navigate(`/recruiter/job/edit/${job.id}`)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(job.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default RecruiterJobList;