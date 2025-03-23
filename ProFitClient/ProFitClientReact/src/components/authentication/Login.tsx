import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import validationRules from '../../validations/LoginValidations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/userSlice';
import Swal from 'sweetalert2';

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        mode: 'onBlur'
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const loginResults = await dispatch(loginUser(data));
        if (loginUser.fulfilled.match(loginResults)) {
            console.log('Login successful:', loginResults.payload);
            Swal.fire({
                title: "Login successful.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        }
        else {
            Swal.fire({
                title: "Login failed.",
                text: "Please check your email and password.",
                icon: "error",
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Login;