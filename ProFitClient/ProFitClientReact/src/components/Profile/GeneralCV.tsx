import { Typography, Box } from "@mui/material";
import CVFile from "../cv/CVFile";
import { useEffect, useState } from "react";
import { getGeneralCV } from "../../services/cvService";

const GeneralCV = () => {
    const [cvId, setCvId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCV = async () => {
            var cv = await getGeneralCV();
            setCvId(cv.id);
        };
        fetchCV();
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                }}
            >
                Your CV
            </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                    textAlign: 'center',
                    marginBottom: 3,
                    fontSize: '1.1rem',
                }}
            >
                This page displays your CV stored in our system. It provides information about your skills and helps us connect you with your dream job. Keep your CV updated to ensure the best opportunities!
            </Typography>

            {cvId !== null && cvId !== undefined && <CVFile id={cvId} />}
        </Box>
    );
};

export default GeneralCV;