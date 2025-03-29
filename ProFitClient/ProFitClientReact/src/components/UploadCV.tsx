import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import swal from 'sweetalert2';
import { uploadGeneralCV } from '../redux/slices/cvSlice';

const UploadCV = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [file, setFile] = useState<File | null>(null);
    const uploadStatus = useSelector((state: any) => state.cv.uploadStatus);

    const validateFileType = (file: File) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return allowedTypes.includes(file.type);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            swal.fire({
                title: 'Please select a file to upload',
                icon: 'warning',
                timer: 2000,
            });
            return;
        }

        if (!validateFileType(file)) {
            swal.fire({
                title: 'Invalid file type. Only PDF, DOC, DOCX files are allowed',
                icon: 'warning',
                timer: 2000,
            });
            return;
        }

        dispatch(uploadGeneralCV({ file }));
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploadStatus === 'loading'}>
                {uploadStatus === 'loading' ? 'Uploading...' : 'Upload Resume'}
            </button>
        </div>
    );
};

export default UploadCV;

