import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const RecruiterHome = () => {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h3" gutterBottom>
          Welcome, Recruiter!
        </Typography>
        <Typography variant="body1">
          Here you can manage job postings, review candidates, and streamline your hiring process.
        </Typography>
      </Box>
    </Container>
  );
};

export default RecruiterHome;