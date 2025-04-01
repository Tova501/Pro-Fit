import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { JobPostModel } from '../../models/jobTypes';
import validationRules from '../../validations/JobValidations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createJob } from '../../redux/slices/jobSlice';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const NewJob = () => {
    const dispatch: AppDispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<JobPostModel>();
    const navigate = useNavigate();

    const onSubmit = (data: JobPostModel) => {
        console.log(data);
        try {
            dispatch(createJob(data));
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
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Add New Job
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Title"
                        {...register("title", validationRules.title)}
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ""}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Description"
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
                        label="Company"
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
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default NewJob;
