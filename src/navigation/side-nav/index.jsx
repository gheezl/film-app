import { MenuOutlined, Home, TrendingUp, ContactsRounded, Search } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

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
                    <Link to="/">
                        <Typography variant="h6" >Home</Typography>
                    </Link>
                </MenuItem>
                <MenuItem
                    icon={<TrendingUp />}
                >
                    <Link to="/trending">
                        <Typography variant="h6" >Trending</Typography>
                    </Link>
                </MenuItem>
                <Link to="/genres">
                    <MenuItem
                        icon={<ContactsRounded />}
                    >
                        <Typography variant="h6" >Genres</Typography>
                    </MenuItem>
                </Link>
                <Link to="/search">
                    <MenuItem
                        icon={<Search />}
                    >
                        <Typography variant="h6" >Search</Typography>
                    </MenuItem>
                </Link>
            </Menu>
        </Sidebar>
    )
}

export default SideNav;