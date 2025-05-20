import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { JobPostModel } from '../../models/jobTypes';
import validationRules from '../../validations/JobValidations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createJob } from '../../redux/slices/jobSlice';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const NewJob = () => {
    const dispatch: AppDispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<JobPostModel>();
    const navigate = useNavigate();

    const onSubmit = async (data: JobPostModel) => {
        try {
            await dispatch(createJob(data));
            swal.fire({
                title: "Job added successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/recruiter/job');
        } catch (error) {
            console.error('Error adding job:', error);
            swal.fire({
                title: "Error adding job.",
                icon: "error",
                text: "Please try again later."
            });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                }}
            >
                {/* טיפים בצד השמאלי */}
                <Box
                    sx={{
                        flex: 1,
                        display: { xs: 'none', md: 'block' },
                        backgroundColor: '#f9f9f9',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: 'primary.main',
                            textAlign: 'center',
                        }}
                    >
                        How to Write an Effective Job Posting
                    </Typography>
                    <ul style={{ paddingLeft: '20px', color: '#555', fontSize: '0.9rem', listStyle: 'none' }}>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Box sx={{ color: 'primary.main', mr: 1 }}>
                                <TitleIcon />
                            </Box>
                            Use a clear and concise job title.
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Box sx={{ color: 'primary.main', mr: 1 }}>
                                <DescriptionIcon />
                            </Box>
                            Provide a detailed description to attract the right candidates.
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Box sx={{ color: 'primary.main', mr: 1 }}>
                                <BuildIcon />
                            </Box>
                            Highlight the required skills and experience.
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Box sx={{ color: 'primary.main', mr: 1 }}>
                                <LocationOnIcon />
                            </Box>
                            Specify the job location for better clarity.
                        </li>
                    </ul>
                </Box>

                {/* קו מפריד אנכי */}
                <Box
                    sx={{
                        width: '1px',
                        backgroundColor: '#e0e0e0',
                        display: { xs: 'none', md: 'block' },
                    }}
                />

                {/* טופס במרכז */}
                <Box sx={{ flex: 2 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            fontWeight: 600,
                            color: 'primary.main',
                            mb: 3,
                        }}
                    >
                        Post Your Job Opportunity
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            mb: 4,
                        }}
                    >
                        Fill in the details below to attract the best candidates for your job opening.
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* שדות הטופס */}
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Job Title"
                                {...register("title", validationRules.title)}
                                error={!!errors.title}
                                helperText={errors.title ? errors.title.message : ""}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Job Description"
                                multiline
                                rows={4}
                                {...register("description", validationRules.description)}
                                error={!!errors.description}
                                helperText={errors.description ? errors.description.message : ""}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                {...register("company", validationRules.company)}
                                error={!!errors.company}
                                helperText={errors.company ? errors.company.message : ""}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Requirements"
                                {...register("requirements", validationRules.requirements)}
                                error={!!errors.requirements}
                                helperText={errors.requirements ? errors.requirements.message : ""}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Skills"
                                {...register("skills", validationRules.skills)}
                                error={!!errors.skills}
                                helperText={errors.skills ? errors.skills.message : ""}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Years of Experience Required"
                                type="number"
                                {...register("yearsOfExperienceRequired", validationRules.yearsOfExperienceRequired)}
                                error={!!errors.yearsOfExperienceRequired}
                                helperText={errors.yearsOfExperienceRequired ? errors.yearsOfExperienceRequired.message : ""}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Location"
                                {...register("location", validationRules.location)}
                                error={!!errors.location}
                                helperText={errors.location ? errors.location.message : ""}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                padding: '10px 20px',
                                borderRadius: 2,
                                fontWeight: 600,
                            }}
                        >
                            Create Job
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

export default NewJob;
