import React from 'react';
import UploadCV from '../components/UploadCV';
import { Typography, Container, Box } from '@mui/material';

const UploadCVPage: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Box mt={5} mb={5}>
                <Typography variant="h5" component="h1" gutterBottom>
                    To help us match you with the best opportunities, we kindly ask you to upload a general CV. 
                    This will allow us to understand your skills and present you with jobs that suit you.
                </Typography>
                <UploadCV />
            </Box>
        </Container>
    );
};

export default UploadCVPage;