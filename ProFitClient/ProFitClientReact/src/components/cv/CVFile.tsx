import { useEffect, useState } from "react";
import { generateViewUrl } from "../../services/cvService";
import { Box, Typography } from "@mui/material";
import swal from "sweetalert2";

const CVFile = ({id}:{id:number}) => {
    const [cvUrl, setCvUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                console.log("ID:", id);
                const url = await generateViewUrl(id);
                setCvUrl(url);
                console.log("CV URL:", url);
            } catch (error) {
                console.error("Error fetching CV URL:", error);
                swal.fire({
                    title: "Error",
                    text: "Failed to load CV. Please try again later.",
                    icon: "error",
                });
            }
        };

        fetchUrl(); 
    }, []); 

    return (
        <Box>
            {cvUrl ? (
                <iframe
                    src={cvUrl}
                    title="CV Document"
                    width="100%"
                    height="560px"
                    style={{ border: "none" , padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
                />
            ) : (
                <Typography variant="body2" color="textSecondary">
                    Loading CV...
                </Typography>
            )}
        </Box>
    );
};

export default CVFile;