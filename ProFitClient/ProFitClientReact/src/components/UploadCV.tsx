import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Alert } from '@mui/material';
import swal from 'sweetalert2';

interface Props {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadCV = ({ open, onClose, onUpload }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setErrorMessage('');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setErrorMessage('');
    }
  };

  const handleUpload = () => {
    if (!file) {
      setErrorMessage('Please select or drag a file to upload.');
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Unsupported file type. Please upload a PDF or Word file.');
      return;
    }

    onUpload(file);
    onClose();
    swal.fire({
      title: 'Success',
      text: 'Your CV has been uploaded successfully!',
      icon: 'success',
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          bgcolor: '#ffffff',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* כותרת */}
        <Typography variant="h5" fontWeight={600} color="#284670" mb={2}>
          Upload Your CV
        </Typography>

        {/* אזור גרירה */}
        <Box
          sx={{
            border: '2px dashed #DFA122',
            borderRadius: 2,
            padding: '20px',
            backgroundColor: '#F9F9F9',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#F3F3F3',
            },
          }}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <Typography variant="body1" color="#555">
            Drag and drop your file here, or click to select
          </Typography>
          <Typography variant="body2" color="#888" mt={1}>
            Supported formats: PDF, DOC, DOCX
          </Typography>
        </Box>

        {/* קלט קובץ */}
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* שם הקובץ שנבחר */}
        {file && (
          <Typography
            variant="body2"
            color="#284670"
            mt={2}
            sx={{ wordBreak: 'break-word' }}
          >
            Selected file: {file.name}
          </Typography>
        )}

        {/* כפתור העלאה */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{
            mt: 3,
            borderRadius: 5,
            textTransform: 'none',
            fontWeight: 500,
            backgroundColor: '#284670',
            '&:hover': {
              backgroundColor: '#DFA122',
            },
          }}
        >
          Upload
        </Button>

        {/* הודעת שגיאה */}
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default UploadCV;
