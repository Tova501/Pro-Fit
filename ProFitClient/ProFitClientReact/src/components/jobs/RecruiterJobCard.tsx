import { Card, CardContent, Typography, Box, Button, IconButton, Chip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Job } from '../../models/jobTypes';

interface JobCardProps {
    job: Job;
    onToggleStatus: (jobId: number, isActive: boolean) => void;
    onMenuOpen: (event: React.MouseEvent<HTMLElement>, jobId: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onToggleStatus, onMenuOpen }) => {
    return (
        <Card
            sx={{
                width: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: job.isActive ? '1px solid #c8e6c9' : '1px solid #e0e0e0',
                backgroundColor: job.isActive ? '#ffffff' : '#f5f5f5',
                borderRadius: '8px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap sx={{ color: '#333' }}>
                    {job.title}
                </Typography>
                <Chip
                    label={job.isActive ? 'Active' : 'Inactive'}
                    sx={{
                        mt: 1,
                        backgroundColor: job.isActive ? '#e8f5e9' : '#eeeeee',
                        color: job.isActive ? '#388e3c' : '#757575',
                    }}
                />
            </CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Button
                    variant="outlined"
                    onClick={() => onToggleStatus(job.id, job.isActive)}
                    sx={{
                        borderColor: job.isActive ? '#d32f2f' : '#388e3c',
                        color: job.isActive ? '#d32f2f' : '#388e3c',
                        borderRadius: '8px',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: job.isActive ? '#fbe9e7' : '#e8f5e9',
                            borderColor: job.isActive ? '#c62828' : '#2e7d32',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    {job.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <IconButton onClick={(event) => onMenuOpen(event, job.id)}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default JobCard;