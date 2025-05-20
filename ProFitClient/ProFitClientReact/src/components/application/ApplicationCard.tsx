import React, { useState } from 'react';
import { Card, CardContent, Avatar, Typography, IconButton, Box, Tooltip, CircularProgress, Collapse } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmailIcon from '@mui/icons-material/Email';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { Application } from '../../models/applicationType';

interface ApplicantCardProps {
    application: Application;
    onToggleFavorite: (id: number, isFavorite: boolean) => void;
    onSendEmail: (email: string) => void;
    onViewMore: (id: number) => void;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ application, onToggleFavorite, onViewMore, onSendEmail }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleToggleFavorite = async () => {
        setIsSaving(true);
        try {
            onToggleFavorite(application.id, application.isFavorite);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card
            sx={{
                position: 'relative',
                padding: 2,
                borderRadius: '8px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                minHeight: '120px',
            }}
        >
            <Box display="flex" alignItems="center" gap={2}>
                {/* תמונת פרופיל */}
                <Avatar
                    sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                    }}
                >
                    {application.user.firstName[0]}
                    {application.user.lastName[0]}
                </Avatar>

                {/* פרטי המועמד */}
                <CardContent
                    sx={{
                        flexGrow: 1,
                        padding: '4px 0',
                        cursor: 'pointer',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                        onClick={() => onViewMore(application.id)}

                    >
                        {application.user.firstName} {application.user.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Email: {application.user.email}
                    </Typography>
                </CardContent>

                {/* כפתורים */}
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    {/* כפתור הוספה/הסרה מהמועדפים */}
                    <Tooltip title={application.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} arrow>
                        <IconButton onClick={handleToggleFavorite} sx={{ color: application.isFavorite ? 'gold' : 'gray' }} disabled={isSaving}>
                            {isSaving ? <CircularProgress size={24} /> : application.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                        </IconButton>
                    </Tooltip>

                    {/* כפתור שליחת מייל */}
                    <Tooltip title="Send Email" arrow>
                        <IconButton onClick={() => onSendEmail(application.user.email)} sx={{ color: 'primary.main' }}>
                            <EmailIcon />
                        </IconButton>
                    </Tooltip>

                    {/* כפתור AI */}
                    <Tooltip title="AI Feature" arrow>
                        <IconButton onClick={() => setExpanded(!expanded)} sx={{ color: 'primary.main' }}>
                            <LightbulbIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* חוות דעת AI */}
            <Collapse in={expanded} sx={{ marginTop: 1 }}>
                <Box
                    sx={{
                        padding: 1.5,
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="body2" color="textSecondary">
                        This feature is currently unavailable. Stay tuned for updates!
                    </Typography>
                </Box>
            </Collapse>
        </Card>
    );
};

export default ApplicantCard;