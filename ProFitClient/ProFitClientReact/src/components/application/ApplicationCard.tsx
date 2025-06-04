import React, { useState } from 'react';
import { Card, Avatar, Typography, IconButton, Box, Tooltip, CircularProgress, Collapse, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmailIcon from '@mui/icons-material/Email';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { Application } from '../../models/applicationType';
import { getAIAnalisis } from '../../services/cvService';
import { Assessment } from '../../models/assesmentType';

interface ApplicantCardProps {
    application: Application;
    onViewMore?: (id: number) => void;
}

const ApplicationCard: React.FC<ApplicantCardProps> = ({ application, onViewMore }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [aiAssessment, setAiAssessment] = useState<Assessment | null>(null);
    const [loadingAI, setLoadingAI] = useState(false);

    const handleToggleFavorite = async () => {
        setIsSaving(true);
        try {
            console.log(`Toggling favorite for application ID: ${application.id}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleFetchAIAnalysis = async () => {
        setLoadingAI(true);
        try {
            const response = await getAIAnalisis(application);
            setAiAssessment(response);
        } catch (error) {
            console.error('Error fetching AI analysis:', error);
        } finally {
            setLoadingAI(false);
        }
    };

    const handleToggleAI = () => {
        setExpanded(!expanded);
        if (!expanded && !aiAssessment) {
            handleFetchAIAnalysis();
        }
    };

    const handleSendEmail = () => {
        window.location.href = `mailto:${application.user.email}`;
    };

    return (
        <Card sx={{ boxShadow: 4, borderRadius: 3, overflow: 'hidden', position: 'relative', padding: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
                {/* Profile Picture */}
                <Avatar
                    sx={{
                        width: 56,
                        height: 56,
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                        fontSize: '1.2rem',
                    }}
                >
                    {application.user.firstName[0]}
                    {application.user.lastName[0]}
                </Avatar>

                {/* Candidate Details */}
                <Box flexGrow={1}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {application.user.firstName} {application.user.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {application.user.email}
                    </Typography>
                </Box>

                {/* Action Buttons */}
                <Box display="flex" gap={1}>
                    <Tooltip title={application.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} arrow>
                        <IconButton onClick={handleToggleFavorite} sx={{ color: application.isFavorite ? 'gold' : 'gray' }} disabled={isSaving}>
                            {isSaving ? <CircularProgress size={24} /> : application.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Send Email" arrow>
                        <IconButton onClick={handleSendEmail} sx={{ color: 'primary.main' }}>
                            <EmailIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="AI Analysis" arrow>
                        <IconButton onClick={handleToggleAI} sx={{ color: 'primary.main' }}>
                            <LightbulbIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* AI Analysis */}
            <Collapse in={expanded} sx={{ marginTop: 2 }}>
                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 2,
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {loadingAI ? (
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <CircularProgress size={24} />
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Matching Score: {aiAssessment?.score}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {aiAssessment?.recommendation}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Collapse>

            {/* View More Button */}
            {onViewMore && (
                <Box display="flex" justifyContent="flex-end" marginTop={2}>
                    <Button variant="outlined" color="primary" onClick={() => onViewMore(application.id)}>
                        View More
                    </Button>
                </Box>
            )}
        </Card>
    );
};

export default ApplicationCard;