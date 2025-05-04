import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, UploadFile as UploadFileIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import swal from 'sweetalert2';
import { updateUser } from '../redux/slices/userSlice';
import { uploadGeneralCV } from '../redux/slices/cvSlice';
import CVFile from './CVFile';
import { getGeneralCV } from '../services/cvService';
import CV from '../models/cvType';

const Profile = () => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [generalCV, setGeneralCV] = useState<CV | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUploadCV = async () => {
        if (!file) {
            swal.fire({
                title: 'Please select a file to upload',
                icon: 'warning',
                timer: 2000,
            });
            return;
        }

        try {
            const resultAction = await dispatch(uploadGeneralCV({ file }));
            if (uploadGeneralCV.fulfilled.match(resultAction)) {
                swal.fire({
                    title: 'CV uploaded successfully!',
                    icon: 'success',
                    timer: 2000,
                });
                setFile(null); // Reset the file input
            } else {
                swal.fire({
                    title: 'Error uploading CV',
                    text: typeof resultAction.payload === 'string' ? resultAction.payload : 'Please try again later.',
                    icon: 'error',
                });
            }
        } catch (error) {
            swal.fire({
                title: 'Error uploading CV',
                text: 'Please try again later.',
                icon: 'error',
            });
        }
    };

    const handleViewCV = async () => {
        const cvId = await getGeneralCV();
        if (cvId) {
            setGeneralCV(cvId);
        }
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        try {
            await dispatch(updateUser(formData));
            swal.fire({
                title: 'Profile updated successfully!',
                icon: 'success',
                timer: 2000,
            });
            setIsEditing(false);
        } catch (error) {
            swal.fire({
                title: 'Error updating profile',
                text: 'Please try again later.',
                icon: 'error',
            });
        }
    };

    const handleChange = (field: 'firstName' | 'lastName', value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Profile
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="First Name"
                            fullWidth
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            disabled={!isEditing}
                            InputProps={{
                                readOnly: !isEditing,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Last Name"
                            fullWidth
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            disabled={!isEditing}
                            InputProps={{
                                readOnly: !isEditing,
                            }}
                        />
                    </Grid>
                    {!isEditing ? (
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                                onClick={handleEditProfile}
                                fullWidth
                            >
                                Edit Profile
                            </Button>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={handleSaveChanges}
                                fullWidth
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Default CV
                </Typography>
                {user?.hasUploadedGeneralCV ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<VisibilityIcon />}
                            onClick={handleViewCV}
                            fullWidth
                        >
                            View CV
                        </Button>
                        {generalCV && (
                            <CVFile cvId={generalCV.id} />
                        )}
                        <Typography variant="h6" gutterBottom sx={{ marginTop: '1rem' }}>
                            Update CV
                        </Typography>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            style={{ marginBottom: '1rem' }}
                        />
                        {file && (
                            <Typography variant="body2" color="textSecondary">
                                Selected file: {file.name}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<UploadFileIcon />}
                            onClick={handleUploadCV}
                            fullWidth
                        >
                            Upload New CV
                        </Button>
                    </>
                ) : (
                    <>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            style={{ marginBottom: '1rem' }}
                        />
                        {file && (
                            <Typography variant="body2" color="textSecondary">
                                Selected file: {file.name}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<UploadFileIcon />}
                            onClick={handleUploadCV}
                            fullWidth
                        >
                            Upload CV
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default Profile;