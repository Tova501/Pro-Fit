import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/slices/userSlice';
import validationRules from '../../validations/RegisterValidations';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        mode: 'onBlur'
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const resultAction = await dispatch(registerUser(data));
            if (registerUser.fulfilled.match(resultAction)) {
                Swal.fire({
                    title: "Registration completed successfully.",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false
                });
                navigate('/upload-cv'); // נווט לעמוד העלאת קובץ
                console.log('Registration successful:', resultAction.payload);
            } else if (registerUser.rejected.match(resultAction)) {
                console.log('Registration failed:', resultAction.payload);
                Swal.fire({
                    title: "Registration failed.",
                    text: "Please check your data.",
                    icon: "error"
                });
            }
        } catch(error:unknown) {
            Swal.fire({
                title: "Registration failed.",
                text: error instanceof Error ? error.message : "Unknown error occurred",
                icon: "error",
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} mb={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="Name"
                        {...register("name", validationRules.name)}
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        {...register("email", validationRules.email)}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        {...register("password", validationRules.password)}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        {...register("confirmPassword", {
                            ...validationRules.confirmPassword,
                            validate: (value) => validationRules.confirmPassword.validate(value, watch("password"))
                        })}
                        fullWidth
                        margin="normal"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Register;
