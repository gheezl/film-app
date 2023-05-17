import { MenuOutlined, Home, TrendingUp, ContactsRounded, VideoStable, Search } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

const SideNav = () => {
    const theme = useTheme();
    const { collapseSidebar } = useProSidebar();

    return (
        <Sidebar backgroundColor={theme.palette.background.default} >
            <Menu iconShape="square">
                <MenuItem
                    icon={<MenuOutlined />}
                    onClick={() => collapseSidebar()}
                >
                    <Typography variant="h4" >Navigation Menu</Typography>
                </MenuItem>
                <MenuItem
                    icon={<Home />}
                >
                    <Typography variant="h6" >Home</Typography>
                </MenuItem>
                <MenuItem
                    icon={<TrendingUp />}
                >
                    <Typography variant="h6" >Trending</Typography>
                </MenuItem>
                <MenuItem
                    icon={<ContactsRounded />}
                >
                    <Typography variant="h6" >Genres</Typography>
                </MenuItem>
                <MenuItem
                    icon={<VideoStable />}
                >
                    <Typography variant="h6" >Film</Typography>
                </MenuItem>
                <MenuItem
                    icon={<Search />}
                >
                    <Typography variant="h6" >Search</Typography>
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideNav;