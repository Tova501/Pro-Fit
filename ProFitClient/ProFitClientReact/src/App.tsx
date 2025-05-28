import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { router } from './components/Router';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { checkAuth } from './redux/slices/userSlice';
import EmailIcon from './components/EmailIcon';
import { customTheme } from './styles/CustomTheme';

function App() {

    const theme = customTheme;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
        <EmailIcon/>
        </>
    )
}

export default App;
