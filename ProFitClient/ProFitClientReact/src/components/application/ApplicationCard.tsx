import React, { useState } from 'react';
import {
    Card,
    Avatar,
    Typography,
    IconButton,
    Box,
    Tooltip,
    CircularProgress,
    Collapse,
    Divider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmailIcon from '@mui/icons-material/Email';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { Application } from '../../models/applicationType';
import { getAIAnalisis } from '../../services/cvService';
import AIAnalysis from './AIAnalysis';
import '../../styles/ApplicationCard.css';

interface ApplicantCardProps {
    application: Application;
    onToggleFavorite: (id: number, isFavorite: boolean) => void;
    onSendEmail: (email: string) => void;
    onViewMore: (id: number) => void;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ application, onToggleFavorite, onViewMore, onSendEmail }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [aiAssessment, setAiAssessment] = useState(null);
    const [loadingAI, setLoadingAI] = useState(false);

    const handleToggleFavorite = async () => {
        setIsSaving(true);
        try {
            onToggleFavorite(application.id, application.isFavorite);
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
            handleFetchAIAnalysis(); // Fetch AI analysis only if not already fetched
        }
    };

    return (
        <Card className="application-card">
            <Box className="application-card-header">
                {/* Profile Picture */}
                <Avatar className="application-avatar">
                    {application.user.firstName[0]}
                    {application.user.lastName[0]}
                </Avatar>

                {/* Candidate Details */}
                <Box className="application-card-content" onClick={() => onViewMore(application.id)}>
                    <Typography variant="h6" className="application-name">
                        {application.user.firstName} {application.user.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Email: {application.user.email}
                    </Typography>
                </Box>

                {/* Action Buttons */}
                <Box className="application-actions">
                    <Tooltip title={application.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} arrow>
                        <IconButton onClick={handleToggleFavorite} disabled={isSaving}>
                            {isSaving ? <CircularProgress size={24} /> : application.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Send Email" arrow>
                        <IconButton onClick={() => onSendEmail(application.user.email)}>
                            <EmailIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="AI Analysis" arrow>
                        <IconButton onClick={handleToggleAI}>
                            <LightbulbIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* AI Assessment */}
            <Collapse in={expanded} className="application-collapse">
                <Divider className="application-divider" />
                <AIAnalysis loading={loadingAI} aiAssessment={aiAssessment} />
            </Collapse>
        </Card>
    );
};

export default ApplicantCard;