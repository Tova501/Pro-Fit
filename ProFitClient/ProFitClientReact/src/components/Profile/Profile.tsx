import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Paper,
    Box,
    Avatar,
} from "@mui/material";
import {
    Edit as EditIcon,
    Save as SaveIcon,
    UploadFile as UploadFileIcon,
    Visibility as VisibilityIcon,
} from "@mui/icons-material";
import swal from "sweetalert2";
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import CVUploadDialog from "../cv/CVUploadDialog";

const Profile = () => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for modal

    const handleViewCV = async () => {
        navigate("cv");
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        try {
            await dispatch(updateUser(formData));
            swal.fire({
                title: "Profile updated successfully!",
                icon: "success",
                timer: 2000,
            });
            setIsEditing(false);
        } catch (error) {
            swal.fire({
                title: "Error updating profile",
                text: "Please try again later.",
                icon: "error",
            });
        }
    };

    const handleChange = (field: "firstName" | "lastName", value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: 5 }}>
            {/* Header */}
            <Box
                sx={{
                    textAlign: "center",
                    marginBottom: 5,
                    padding: "20px",
                    backgroundColor: "#284670",
                    color: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", margin: 3, justifyContent: "center" }}>
                    <Avatar
                        sx={{
                            backgroundColor: "#DFA122",
                            padding: 3,
                            fontSize: "32px",
                            margin: 1
                        }}
                    >
                        {user?.firstName?.[0] || "U"}
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700}}>
                        {user?.firstName} {user?.lastName}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ marginTop: 1, color: "#fff" }}>
                    Welcome to your profile dashboard! Manage your details and CV here.
                </Typography>
            </Box>

            {/* Profile Details */}
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 5 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Profile Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="First Name"
                            fullWidth
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
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
                            onChange={(e) => handleChange("lastName", e.target.value)}
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

            {/* CV Management */}
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 5 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    CV Management
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "bold",
                        color: user?.hasUploadedGeneralCV ? "green" : "red",
                        marginBottom: 2,
                    }}
                >
                    {user?.hasUploadedGeneralCV
                        ? "Great! Your CV is uploaded and ready for employers to view."
                        : "It looks like you haven’t uploaded your CV yet. Let’s get started!"}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {user?.hasUploadedGeneralCV && (
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<VisibilityIcon />}
                                onClick={handleViewCV}
                                fullWidth
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                View Your CV
                            </Button>
                        </Grid>
                    )}
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<UploadFileIcon />}
                            onClick={() => setIsUploadModalOpen(true)} // Open modal
                            fullWidth
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                            }}
                        >
                            {user?.hasUploadedGeneralCV ? "Update Your CV" : "Upload Your CV"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* CV Upload Modal */}
            <CVUploadDialog
                action={user?.hasUploadedGeneralCV ? "update" : "upload"}
                open={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </Container>
    );
};

export default Profile;