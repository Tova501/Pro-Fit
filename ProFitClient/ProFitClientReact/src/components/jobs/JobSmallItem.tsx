import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Job from '../../models/jobType';

interface JobItemProps {
    job: Job;
}

const JobSmallItem: React.FC<JobItemProps> = ({ job }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {job.title}
                </Typography>
                <Typography color="textSecondary">
                    {job.description}
                </Typography>
                <Typography variant="body2" component="p">
                    {job.requirements}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Apply</Button>
            </CardActions>
        </Card>
    );
};

export default JobSmallItem;