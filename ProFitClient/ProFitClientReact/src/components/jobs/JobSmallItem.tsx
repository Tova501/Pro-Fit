import React from 'react';
import { Button, Card, CardActions, CardContent, Typography, Tooltip } from '@mui/material';
import { Job } from '../../models/jobTypes';
import { Link } from 'react-router-dom';

interface JobItemProps {
    job: Job;
    userType: 'candidate' | 'recuiter';
}

const JobSmallItem: React.FC<JobItemProps> = ({ job, userType }) => {
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
                {userType === 'recuiter' && (
                    <CardActions>
                        <Button size="small" component={Link} to={`edit/${job.id}`}>
                            Edit
                        </Button>
                    </CardActions>
                )}
                {userType === 'candidate' && (
                    <>
                        <CardActions>
                            <Tooltip title="Apply directly without attaching your CV">
                                <Button size="small">Apply</Button>
                            </Tooltip>
                            <Tooltip title="Apply and attach your CV for better chances">
                                <Button size="small">Apply with CV</Button>
                            </Tooltip>
                        </CardActions>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default JobSmallItem;