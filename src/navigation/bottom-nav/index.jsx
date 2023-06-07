import { Box, BottomNavigation, BottomNavigationAction, useTheme } from "@mui/material";
import { Brightness2, Home, Star, Visibility } from "@mui/icons-material";
import { useContext, useState } from "react";
import { StylingContext } from "../../contexts/StylingProvider";

const BottomNav = () => {
    const [value, setValue] = useState(0)

    const theme = useTheme();
    const { toggleMode, currentMode } = useContext(StylingContext);

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
            <BottomNavigation value={value} onChange={() => setValue(2)}
                sx={{
                    backgroundColor: theme.palette.background.second
                }}
            >
                <BottomNavigationAction label="Home" icon={<Home style={{ color: theme.palette.primary.second }} />} />
                <BottomNavigationAction label="Viewed" icon={<Visibility style={{ color: theme.palette.primary.second }} />} />
                <BottomNavigationAction label="Recommendations" icon={<Star style={{ color: theme.palette.primary.second }} />} />
                <BottomNavigationAction onClick={() => toggleMode()} label="Theme" icon={<Brightness2 style={{ color: theme.palette.primary.second }} />} />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNav;