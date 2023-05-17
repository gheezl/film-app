import { Box, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";

const SideNav = () => {
    const theme = useTheme();

    return (
        <Box sx={{ border: "1px solid black" }}>
            <ProSidebar>
                <MenuItem >
                    <Typography>HELLO WORLD?</Typography>
                </MenuItem>
            </ProSidebar>
        </Box>
    )
}

export default SideNav;