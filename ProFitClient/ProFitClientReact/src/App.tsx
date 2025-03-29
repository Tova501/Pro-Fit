import { Provider } from 'react-redux';
import store from './redux/store';
import { router } from './components/Router';
import { RouterProvider } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0006ff', // צבע ראשי
        },
        secondary: {
            main: '#dc004e', // צבע משני
        },
        background: {
            default: '#ffffff', // רקע כללי
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ThemeProvider>
    )
}

export default App;
