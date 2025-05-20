import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/slices/userSlice';
import validationRules from '../../validations/RegisterValidations';
import Swal from 'sweetalert2';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>(
        {
            mode: 'onBlur'
        }
    );

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            data.lastName = '';
            const resultAction = await dispatch(registerUser(data));
            console.log("register resultAction", resultAction);

            if (registerUser.fulfilled.match(resultAction)) {
                Swal.fire({
                    title: "Registration successful.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate("/profile");
            } else if (registerUser.rejected.match(resultAction)) {
                const errorPayload = resultAction.payload as { statusCode: number; message: string };

                if (errorPayload.statusCode === 409) {
                    Swal.fire({
                        title: "User already exists.",
                        text: "Please use a different email.",
                        icon: "warning",
                    });
                } else {
                    Swal.fire({
                        title: "Registration failed.",
                        text: errorPayload.message || "Something went wrong. Please try again later.",
                        icon: "error",
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: "An unexpected error occurred.",
                text: "Please try again later.",
                icon: "error",
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="First Name"
                        {...register("firstName", validationRules.firstName)}
                        fullWidth
                        margin="normal"
                        error={!!errors.firstName}
                        helperText={errors.firstName ? errors.firstName.message : ''}
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
                <Box mt={2}>
                    <Typography variant="body2">
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
