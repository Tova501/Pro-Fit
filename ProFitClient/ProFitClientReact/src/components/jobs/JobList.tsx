import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/slices/jobSlice';
import { RootState, AppDispatch } from '../../redux/store';
import JobItem from './JobSmallItem';
import { CircularProgress, Container, Typography, Box } from '@mui/material';

const RecruiterJobList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { jobs, loading, error } = useSelector((state: RootState) => state.job);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center',
                    mt: 4,
                }}
            >
                {jobs.map((job) => (
                    <Box
                        key={job.id}
                        sx={{
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <JobItem job={job} userType="candidate" />
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default RecruiterJobList;