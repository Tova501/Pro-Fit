import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/slices/jobSlice';
import { RootState, AppDispatch } from '../../redux/store';
import JobItem from './JobSmallItem';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';

const JobList: React.FC = () => {
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
            <Typography variant="h4" component="h1" gutterBottom>
                Job Listings
            </Typography>
            <Grid container spacing={4}>
                {jobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <JobItem job={job} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default JobList;