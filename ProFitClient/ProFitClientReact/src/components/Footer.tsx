import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        marginTop: '50px',
        padding: '20px',
        backgroundColor: '#284670',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © 2025 ProFit. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Contact us: profit.jobs.help@gmail.com
      </Typography>
    </Box>
  );
};

export default Footer;