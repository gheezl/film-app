import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home } from "@mui/icons-material";

const BottomNav = () => {
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
            <BottomNavigation value={1} onChange={() => { }}>
                <BottomNavigationAction label="Home" icon={<Home />} />
                <BottomNavigationAction label="Explore" icon={<Home />} />
                <BottomNavigationAction label="Notifications" icon={<Home />} />
                <BottomNavigationAction label="Profile" icon={<Home />} />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNav;