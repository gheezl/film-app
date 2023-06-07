import { Box, BottomNavigation, BottomNavigationAction, useTheme } from "@mui/material";
import { Brightness2, Home, Star, Visibility } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { StylingContext } from "../../contexts/StylingProvider";
import { Navigate, useNavigate } from "react-router-dom";

const BottomNav = () => {
    const [value, setValue] = useState(0)

    const theme = useTheme();
    const { toggleMode } = useContext(StylingContext);
    const navigate = useNavigate();

    const handleNav = (event, newValue) => {
        if (newValue === 0) {
            navigate('/');
        }
        else if (newValue === 1) {
            navigate('/recently-viewed');
        }
        else if (newValue === 2) {
            navigate('/recommendations');
        }
        else if (newValue === 3) {
            toggleMode();
        }
        setValue(newValue)
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 1,
                width: '100%',
            }}
        >
            <BottomNavigation value={value} onChange={handleNav}
                sx={{
                    backgroundColor: theme.palette.background.second
                }}
            >
                <BottomNavigationAction sx={{ color: theme.palette.primary.second }} icon={<Home />} />
                <BottomNavigationAction sx={{ color: theme.palette.primary.second }} icon={<Visibility />} />
                <BottomNavigationAction sx={{ color: theme.palette.primary.second }} icon={<Star />} />
                <BottomNavigationAction sx={{ color: theme.palette.primary.second }} onClick={() => toggleMode()} icon={<Brightness2 />} />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNav;