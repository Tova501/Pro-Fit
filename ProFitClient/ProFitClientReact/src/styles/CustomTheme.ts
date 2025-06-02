import { createTheme } from "@mui/material";

export const customTheme = createTheme({
    palette: {
        primary: {
            main: '#284670',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#dfa021', 
            contrastText: '#000000',
        },
        background: {
            default: '##f0f4f8',
            paper: '#ffffff',
        },
        error: {
            main: '#c62d21',
        },
        success: {
            main: '#007f5f',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#003d33',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#003d33',
        },
        body1: {
            fontSize: '1.1rem',
            color: '#333333',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            color: '#284670',
        },
        
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    border: `1px solid #dfa021`, 
                    color: '#dfa021', 
                    '&:hover': {
                        backgroundColor: 'rgba(223, 160, 33, 0.1)', // צבע רקע עדין בהובר
                        borderColor: '#dfa021',
                        boxShadow: 'none', 
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
