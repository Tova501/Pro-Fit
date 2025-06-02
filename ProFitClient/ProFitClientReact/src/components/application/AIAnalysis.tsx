import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AssistantIcon from '@mui/icons-material/Assistant';
import { Assessment } from '../../models/assesmentType';

interface AIAnalysisProps {
    loading: boolean;
    aiAssessment: Assessment | null;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ loading, aiAssessment }) => {
    if (loading) {
        return (
            <Box className="application-loading" sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (!aiAssessment) {
        return (
            <Typography variant="body2" color="textSecondary">
                No AI analysis available.
            </Typography>
        );
    }

    return (
        aiAssessment && (
            <Box className="application-assessment-content">
                <Typography variant="subtitle1" className="application-score">
                    Matching Score: {aiAssessment.score}
                </Typography>
                {aiAssessment.adventages.map((adv, index) => (
                    <Box key={index} className="application-advantage">
                        <CheckCircleIcon color="success" />
                        <Typography variant="body2">{adv}</Typography>
                    </Box>
                ))}
                {aiAssessment.disadvantages.map((disadvantage, index) => (
                    <Box key={index} className="application-disadvantage">
                        <CancelIcon color="error" />
                        <Typography variant="body2">{disadvantage}</Typography>
                    </Box>
                ))}
                <Typography variant="body2" className="application-recommendation">
                    <AssistantIcon />
                    {aiAssessment.recommendation}
                </Typography>
            </Box>
        )
    );
};

export default AIAnalysis;