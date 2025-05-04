import React from 'react';
//import { GoogleLogin } from '@react-oauth/google';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import validationRules from '../../validations/LoginValidations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/userSlice';
import Swal from 'sweetalert2';
import '../../styles/Style.css'

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
    const handleGoogleSignIn = async (token: string) => {
        // try {
            
        //     const { user, token: jwtToken } = await dispatch(connectWithGoogle({ token })).unwrap() as { user: User; token: string };

        //     localStorage.setItem('token', jwtToken);
        //     console.log("Google Sign-In Success:", user);
        //     dispatch(setCurrentUser(user));
        //     navigate('/');
           
        // } catch (error: any) {
        //     console.error('Google Sign-In Error:', error.response?.data || error.message);
        //     setErrorMessage(error.response?.data?.message || 'Failed to sign in with Google. Please try again.');
        // }
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
                <Box mt={2}>
                    <Typography variant="body2">
                        Don't have an account? <Link to="/register">Register</Link>
                    </Typography>
                </Box>
            </Box>
            {/* <Divider sx={{ my: 4 }}>
                <Typography variant="body2" color="text.secondary">
                    OR
                </Typography>
            </Divider>
            <Box
                sx={{
                    width: "100%",  
                    display: "flex",
                    justifyContent: "center",
                    mt: 2, // מרווח עליון
                }}
            >
                <GoogleLogin
                    locale='en'
                    text="signin_with"
                    onSuccess={(credentialResponse) => {
                        console.log('Google Sign-In Success:', credentialResponse);
                        const token = credentialResponse.credential;
                        if (token) {
                            handleGoogleSignIn(token);
                        } else {
                            console.error('Google Sign-In failed: Token is undefined');
                        }
                    }}
                    onError={() => {
                        console.error('Google Sign-In Failed');
                    }}
                    useOneTap
                    theme="outline" // עיצוב כפתור
                    size="large"
                />
            </Box> */}
        </Container>
    );
};

export default Login;