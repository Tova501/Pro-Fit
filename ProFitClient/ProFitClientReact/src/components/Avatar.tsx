import { useSelector } from 'react-redux';
import User from '../models/userTypes';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import '../styles/AvatarProfile.css';

const AvatarProfile = () => {
    const user: User | null = useSelector((state: any) => state.user.currentUser);
    const navigate = useNavigate();

    function stringToColor(string: string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    const handleClick = () => {
        navigate('/profile');
    };

    const avatarContent = user && user.firstName && user.lastName
        ? `${user.firstName[0]}${user.lastName[0]}`
        : '?';

    return (
        <Box className="avatar-container" onClick={handleClick}>
            <Avatar
                className="avatar"
                sx={{
                    bgcolor: user && user.firstName && user.lastName
                        ? stringToColor(`${user.firstName} ${user.lastName}`)
                        : '#ccc', border: '1px solid white'
                }}
            >
                <Box className="avatar-content">
                    <Typography className="avatar-initials">{avatarContent}</Typography>
                    <Box className="avatar-hover">
                        <EditIcon fontSize="small" />
                        <Typography variant="body2">Update your profile</Typography>
                    </Box>
                </Box>
            </Avatar>
        </Box>
    );
};

export default AvatarProfile;