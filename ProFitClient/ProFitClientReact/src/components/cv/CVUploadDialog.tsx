import { useDispatch } from "react-redux";
import { Modal, Box, Typography, Button } from "@mui/material";
import FileUpload from "../common/FileUpload";
import { AppDispatch } from "../../redux/store";
import { uploadGeneralCV } from "../../redux/slices/cvSlice";
import { updateGeneralCV } from "../../services/cvService";
import { useState } from "react";

interface CVUploadDialogProps {
    open: boolean;
    onClose: () => void;
    action: 'upload' | 'update';
}

const CVUploadDialog = ({ open, onClose, action }: CVUploadDialogProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = async (file: File) => {
        setFile(file);
    };

    const handleSubmit = async () => {
        if (!file) return;

       try {
            if (action === 'update') {
                await updateGeneralCV(file);
            }
            else {
                await dispatch(uploadGeneralCV({ file }));
            }
        } catch (error) {
            console.error("Error uploading CV:", error);
        }
        onClose();

    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="upload-cv-modal"
            aria-describedby="upload-cv-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography id="upload-cv-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Upload Your CV
                </Typography>
                <FileUpload
                    onFileSelect={handleFileSelect}
                    acceptedFileTypes={[
                        "application/pdf",
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ]}
                    maxFileSize={5 * 1024 * 1024} 
                />
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default CVUploadDialog;