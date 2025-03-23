import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
jo
const UploadCV = () => {

    const [file, setFile] = useState<File | null>(null);
    const validateFileType = (file: File) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return allowedTypes.includes(file.type);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const validateFile = () => {
        if (!file) {
            swal.fire({
                title: 'Please select a file to upload',
                icon: 'warning',
                timer: 2000
            })
            return false;
        }
        if(!validateFileType(file)) {
            swal.fire({
                title: 'Invalid file type. Only PDF, DOC, DOCX files are allowed',
                icon: 'warning',
                timer: 2000
            })
            return false;
        }
        return true;
    };

    const handleUpload = async () => {
        if (!validateFile()) {
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append('CV', file);
        }

        try {
            const response = await axios.post('http://your-api-url/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null);
            swal.fire({
                title: 'File uploaded successfully',
                icon: 'success',
                timer: 2000
            })
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Resume</button>
        </div>
    );
};

export default UploadCV;

