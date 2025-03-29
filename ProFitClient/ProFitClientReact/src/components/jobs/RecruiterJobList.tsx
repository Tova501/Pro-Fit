import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/slices/jobSlice';
import { RootState, AppDispatch } from '../../redux/store';
import JobItem from './JobSmallItem';
import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const RecruiterJobList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { jobs, loading, error } = useSelector((state: RootState) => state.job);
    const userId = useSelector((state: RootState) => state.user).currentUser?.id;
    const filteredJobs = jobs.filter((job) => job.recruiterId === userId); 

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
            <Button component={Link} to={'add'}>
                Add Job
            </Button>
            <Typography variant="h4" component="h1" gutterBottom>
                Job Listings
            </Typography>
            <Grid container spacing={4}>
                {filteredJobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <JobItem job={job} userType='recuiter'/>
                       
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RecruiterJobList;