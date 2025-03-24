import React, { useState } from 'react';
import { Modal, Box, Tabs, Tab } from '@mui/material';
import Login from './Login'; // ודא שהנתיב נכון
import Register from './Register'; // ודא שהנתיב נכון

const Auth: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        sx={{ 
          width: 400, 
          maxHeight: '80%', 
          overflowY: 'auto', 
          margin: 'auto', 
          padding: 2, 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          boxShadow: 24 
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {value === 0 && <Login />}
        {value === 1 && <Register />}
      </Box>
    </Modal>
  );
};

export default Auth;
