import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Job, JobPostModel } from '../../models/jobTypes';
import validationRules from '../../validations/JobValidations';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { editJob } from '../../redux/slices/jobSlice';
import swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';

const EditJob = () => {
    const id = parseInt(useParams().id || '0', 10);

    const initialState = useSelector((state: RootState) =>
        state.job.jobs.find((job: Job) => job.id === id)
    );
    const { register, handleSubmit, formState: { errors } } = useForm<JobPostModel>({
        defaultValues: initialState || {}
    });

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: JobPostModel) => {
        try {
            var response = await dispatch(editJob({ "jobId": id, "jobData": data }));
            swal.fire({
                title: "Job Updated Successfully!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/recruiter/job');
        } catch (error) {
            swal.fire({
                title: "Error Updating Job",
                icon: "error",
                text: "Please try again later."
            });
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
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
                    Update Your Job Details
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        mb: 4,
                    }}
                >
                    Please fill out the form below to update the job details. Make sure all fields are accurate.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        Update Job
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EditJob;
