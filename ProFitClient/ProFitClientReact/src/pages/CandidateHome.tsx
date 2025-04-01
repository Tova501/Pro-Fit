import { Typography, Container, Box } from '@mui/material';

const CandidateHome = () => {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h3" gutterBottom>
          Welcome, Candidate!
        </Typography>
        <Typography variant="body1">
          Here you can upload your CV, find job opportunities, and track your applications.
        </Typography>
      </Box>
    </Container>
  );
};

export default CandidateHome;