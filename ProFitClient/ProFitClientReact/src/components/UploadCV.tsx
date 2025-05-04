import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Alert } from '@mui/material';
import swal from 'sweetalert2';
import axios from 'axios';

interface props { open: boolean; onClose: () => void; onUpload: (file: File) => void; }

const UploadCV = ({ open, onClose, onUpload }: props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile !== null) {
            setFile(selectedFile);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setErrorMessage("Please select a file to upload.");
            return;
        }

        try {
            const contentType = file.type;
            if (contentType !== 'application/pdf' &&
                contentType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
                contentType !== 'application/msword') {
                setErrorMessage("Unsupported file type. Please upload a PDF or Word file.");
                return;
            }

            // אם הקובץ הוא Word, תוכל להמיר אותו ל-PDF בעזרת CloudConvert
            if (contentType !== 'application/pdf') {
                const convertedFile = await convertFile(file);
                onUpload(convertedFile);
            } else {
                onUpload(file);
            }

            onClose();
        } catch (error) {
            swal.fire({
                title: 'Error',
                text: 'Failed to upload CV. Please try again later.',
                icon: 'error',
            });
        }
    };

    const convertFile = async (file: File) => {
        const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmUyZGRiYTRiMGQwNjA3ZTZmODQwMGQyZDA1YWQ1MGE4MTAxMTNhYWUwY2VkZTliM2ZkYmIxMGE1NDA0NDk5NzNhNzAyMTgwMzUyNWExYmUiLCJpYXQiOjE3NDYxNzk2NDIuNTYzNDgxLCJuYmYiOjE3NDYxNzk2NDIuNTYzNDgyLCJleHAiOjQ5MDE4NTMyNDIuNTU4Mjg2LCJzdWIiOiI3MTgwNjM3MiIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.P1SXuSWUxQsblkmqfv06aEQ5alY6mG8MvAZkdM3He37ZapIkAKLjqYEsBVMOdkD_eHJJSF0_Qf5q67_Y0PEWiQ83Ji0X9X6KtnU2rl0G_Pg0VuY_pLN5XFC4fK4imfXj3Uj4NUWrQ1bECEqHUpnhOD6z8oUKKVdOcOhwZjOn4nIJnXXY-VRhLZF_wehAxCVrjNwNft1tGA4Y4j9W2WdLEM4X1RiEFUSdtQODOjIrtwl_LZrqSD-JLDC9SS-_kFS9l97gv0ZKabtc3Fq4gJgORvadNGH6cXwZY6EF6NaBG0Nebs_IfkOc09op0BSUaJNFADlG4axA4C5qn0vm-VLheWQyxdRMWxWHWNfhAj8d3TM6Nff_sKtlvKH2whhaCiHLngqdadgpko7VNKMR-4sRxPvJy55ARCZecMRhVfLeBj0Tg_zWfbuHPNiysxBgnjDHTAa2wOAq7htuqVN8-Dvc2YShpWGX0PR4mAHJIuUvHw99UnPjhsFYJHR8nwSNw0K6clQUVulLwH48qjvvDfSbG_Mj7a0Evy2BdrPUnqdaTCecrBzS0IneyR3Lashe5ToJd5Hc_U6MdQrkoX1GIY9QscMtEK0Uo28_3gZ9ulNPoCyTuHp1j5NSq3Jq5OlTjzpi5XQAz9t4GhMOwiVkFsZGhl-hLoJz1sQIUeOk3dorP5k'

        try {
            // שלב 1: יצירת משימת העלאה
            const importResponse = await axios.post(
                'https://api.cloudconvert.com/v2/import/upload',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            const uploadUrl = importResponse.data.data.result.form.url; // URL להעלאת הקובץ
            const parameters = importResponse.data.data.result.form.parameters; // פרמטרים להעלאה

            // שלב 2: יצירת טופס עם הפרמטרים והקובץ
            const formData = new FormData();
            Object.keys(parameters).forEach((key) => {
                formData.append(key, parameters[key]);
            });
            formData.append('file', file);

            // שלב 3: העלאת הקובץ ל-CloudConvert
            await axios.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const fileImportTaskId = importResponse.data.data.id;

            // שלב 4: יצירת משימת המרה
            const inputFormat =
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    ? 'docx'
                    : file.type === 'application/msword'
                    ? 'doc'
                    : null;

            if (!inputFormat) {
                throw new Error('Unsupported file type. Please upload a Word document.');
            }

            const convertResponse = await axios.post(
                'https://api.cloudconvert.com/v2/convert',
                {
                    input: fileImportTaskId,
                    inputformat: inputFormat,
                    output_format: 'pdf',
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            const convertTaskId = convertResponse.data.data.id;

            // שלב 5: המתנה להשלמת ההמרה
            const waitForCompletion = async () => {
                const response = await axios.get(
                    `https://api.cloudconvert.com/v2/tasks/${convertTaskId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                        },
                    }
                );
                return response.data.data;
            };

            let taskStatus;
            do {
                taskStatus = await waitForCompletion();
            } while (taskStatus.status === 'waiting' || taskStatus.status === 'processing');

            // שלב 6: הורדת הקובץ המומר
            if (taskStatus.status === 'finished') {
                const downloadLink = taskStatus.result.files[0].url; // קישור להורדת הקובץ
                const response = await axios.get(downloadLink, { responseType: 'blob' }); // הורדת הקובץ
                return new File([response.data], 'converted.pdf', { type: 'application/pdf' });
            } else {
                throw new Error('Conversion failed with status: ' + taskStatus.status);
            }
        } catch (error) {
            console.error('Error during conversion:', error.response?.data || error.message);
            throw error; // זורק את השגיאה כדי שניתן יהיה לטפל בה במקום אחר
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <Typography variant="h6">Upload Your CV</Typography>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ margin: '20px 0' }}
                />
                <Typography variant="body2" color="textSecondary">
                    Drag and drop your file here or click to select.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
                    Upload
                </Button>
                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
            </Box>
        </Modal>
    );
};

export default UploadCV;




