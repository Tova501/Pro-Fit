import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material";
import FileUpload from "../common/FileUpload";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { applyToJob, applyToJobWithCV } from "../../services/jobService";

interface ApplyingToJobDialogProps {
    open: boolean;
    onClose: () => void;
    jobId: number;
}

const ApplyingToJobDialog = ({ open, onClose, jobId }: ApplyingToJobDialogProps) => {

    const [file, setFile] = useState<File | null>(null);
    const HasGeneralCV = useSelector((state: RootState) => state.user.currentUser?.hasUploadedGeneralCV);

    const handleFileSelect = (selectedFile: File | null) => {
        if (selectedFile) {
            setFile(selectedFile);
            // Here you can handle the file upload logic, e.g., sending it to the server
            console.log("Selected file:", selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleApply = async () => {
        await applyToJob(jobId);
        onClose();
    }

    const handleApplyWithCV = async () => {
        await applyToJobWithCV(jobId, file!);
        onClose();
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Apply for Job</DialogTitle>
                <DialogContent>
                    {
                        HasGeneralCV ? (
                            <DialogContentText>
                                You have your CV uploaded. You can continue with it or upload a custom CV for this job.
                            </DialogContentText>
                        ) : (
                            <DialogContentText>
                                You do not have a general CV uploaded. Please upload a custom CV for this job.
                            </DialogContentText>
                        )
                    }
                </DialogContent>
                <Box
                    sx={{
                        alignSelf: "center",
                        p: 3,
                        borderRadius: 2,
                        width: "100%"
                    }}>
                    <FileUpload
                        onFileSelect={handleFileSelect}
                        acceptedFileTypes={[
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ]}
                        maxFileSize={5 * 1024 * 1024}
                    />
                </Box>
                                <DialogActions>
                    <Button
                        onClick={() => { handleApply(); }}
                        color="primary"
                        disabled={!HasGeneralCV}
                    >
                        Continue Without CV

                    </Button>
                    <Button
                        onClick={() => { handleApplyWithCV(); }}
                        color="primary"
                        disabled={!file}
                    >
                        Apply with CV
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default ApplyingToJobDialog;