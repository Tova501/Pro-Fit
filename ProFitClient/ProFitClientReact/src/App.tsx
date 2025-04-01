import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { router } from './components/Router';
import { RouterProvider } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { checkAuth } from './redux/slices/userSlice';

const theme = createTheme({
    palette: {
        primary: {
            main: '#005f73',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#94d2bd', // צבע משני (ירוק בהיר)
            contrastText: '#000000', // צבע טקסט על צבע משני
        },
        background: {
            default: '#f0f4f8', // רקע כללי (אפור בהיר)
            paper: '#ffffff', // רקע של רכיבי נייר
        },
        error: {
            main: '#d00000', // צבע שגיאה (אדום)
        },
        success: {
            main: '#007f5f', // צבע הצלחה (ירוק כהה)
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem', // גודל כותרת 1
            fontWeight: 700,
            color: '#003d33', // צבע טקסט כהה
        },
        h2: {
            fontSize: '2rem', // גודל כותרת 2
            fontWeight: 600,
            color: '#003d33', // צבע טקסט כהה
        },
        body1: {
            fontSize: '1.1rem', // גודל טקסט גוף
            color: '#333333', // צבע טקסט גוף
        },
        button: {
            textTransform: 'none', // הסרת שינוי גודל טקסט בכפתורים
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', 
                    padding: '8px 16px', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        backgroundColor: '#94d2bd',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
});



function App() {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App;
