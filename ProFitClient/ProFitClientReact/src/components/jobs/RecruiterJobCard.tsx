import { Card, CardContent, Typography, Box, Button, IconButton, Chip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
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
                boxShadow: 4,
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                padding: 2,
                backgroundColor: job.isActive ? '#ffffff' : '#f9f9f9',
            }}
        >
            <CardContent>
                {/* כותרת המשרה */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', marginBottom: 1 }}>
                    {job.title}
                </Typography>

                {/* סטטוס */}
                <Chip
                    label={job.isActive ? 'Active' : 'Inactive'}
                    sx={{
                        backgroundColor: job.isActive ? 'rgba(33, 150, 243, 0.1)' : 'rgba(156, 39, 176, 0.1)',
                        color: job.isActive ? 'primary.main' : 'secondary.main',
                        marginBottom: 2,
                    }}
                />

                {/* פרטים נוספים */}
                <Box display="flex" flexDirection="column" gap={1} sx={{ marginBottom: 2 }}>
                    <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" gap={1}>
                        <BusinessIcon fontSize="small" /> {job.company}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon fontSize="small" /> {job.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <strong>Posted On:</strong> {new Date(job.postedDate).toLocaleDateString()}
                    </Typography>
                </Box>

                {/* תיאור */}
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                        marginBottom: 2,
                    }}
                >
                    {job.description}
                </Typography>
            </CardContent>

            {/* פעולות */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button
                    variant="outlined"
                    onClick={() => onToggleStatus(job.id, job.isActive)}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        color: job.isActive ? 'primary.main' : 'secondary.main',
                        borderColor: job.isActive ? 'primary.main' : 'secondary.main',
                        '&:hover': {
                            backgroundColor: job.isActive ? 'rgba(33, 150, 243, 0.1)' : 'rgba(156, 39, 176, 0.1)',
                        },
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