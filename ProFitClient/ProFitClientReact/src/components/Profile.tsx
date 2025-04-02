import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateCV } from '../services/cvService';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, UploadFile as UploadFileIcon } from '@mui/icons-material';
import swal from 'sweetalert2';

const Profile = () => {
    const user = useSelector((state: RootState) => state.user.currentUser);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState<File | null>(null);

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
            await updateCV(user?.id.toString() || '', file);
            swal.fire({
                title: 'CV updated successfully!',
                icon: 'success',
                timer: 2000,
            });
        } catch (error) {
            swal.fire({
                title: 'Error updating CV',
                text: 'Please try again later.',
                icon: 'error',
            });
        }
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        try {
            // Update user details (you can add a service call here if needed)
            console.log('Updated user details:', formData);
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
                    Upload Default CV
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
                    Upload CV
                </Button>
            </Paper>
        </Container>
    );
};

export default Profile;