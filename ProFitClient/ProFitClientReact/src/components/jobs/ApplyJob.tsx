import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const ApplyJob = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            console.error('No file selected.');
            return;
        }

        try {
            // Step 1: Get Pre-signed URL
            const response = await fetch(`/generate-presigned-url?fileName=${file.name}`);
            const data = await response.json();

            // Step 2: Upload the file to S3
            const uploadResponse = await fetch(data.presignedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type // Set the content type
                }
            });

            if (uploadResponse.ok) {
                console.log('File uploaded successfully.');
            } else {
                console.error('File upload failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography variant="h6">Upload File</Typography>
            <input type="file" onChange={handleFileChange} />
            <Button variant="contained" color="primary" type="submit">
                Upload
            </Button>
        </form>
    );
};

export default FileUpload;
