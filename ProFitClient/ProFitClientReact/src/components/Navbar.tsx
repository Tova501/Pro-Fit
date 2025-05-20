import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { RootState, AppDispatch } from "../redux/store";

const Navbar = () => {

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <>
            
         
        </>
    );
}

export default Navbar