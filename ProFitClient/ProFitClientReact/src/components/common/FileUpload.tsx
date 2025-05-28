import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../../styles/FileUpload.css';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    acceptedFileTypes?: string[];
    maxFileSize?: number; // in bytes
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, acceptedFileTypes = ['*'], maxFileSize = 10 * 1024 * 1024 }) => {
    const [dragging, setDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        validateAndSelectFile(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            validateAndSelectFile(file);
        }
    };

    const validateAndSelectFile = (file: File) => {
        if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(file.type) && !acceptedFileTypes.includes('*')) {
            setErrorMessage('Invalid file type.');
            return;
        }

        if (file.size > maxFileSize) {
            setErrorMessage(`File size exceeds the limit of ${maxFileSize / (1024 * 1024)} MB.`);
            return;
        }

        setErrorMessage('');
        setSelectedFile(file);
        onFileSelect(file);
    };

    return (
        <Box className={`file-upload-container ${dragging ? 'dragging' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <input
                type="file"
                id="file-input"
                className="file-input"
                onChange={handleFileChange}
                accept={acceptedFileTypes.join(',')}
            />
            <label htmlFor="file-input" className="file-upload-label">
                <CloudUploadIcon className="upload-icon" />
                <Typography variant="body1" className="upload-text">
                    {selectedFile ? `Selected File: ${selectedFile.name}` : 'Drag & Drop your file here or click to upload'}
                </Typography>
                <Typography variant="body2" className="upload-subtext">
                    Accepted file types: {acceptedFileTypes.join(', ') || 'All'} | Max size: {maxFileSize / (1024 * 1024)} MB
                </Typography>
            </label>
            {errorMessage && (
                <Typography variant="body2" color="error" className="error-message">
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
};

export default FileUpload;