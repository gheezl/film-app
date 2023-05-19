import { MenuOutlined, Home, TrendingUp, ContactsRounded, Search } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SideNav = () => {
    const theme = useTheme();
    const { collapseSidebar } = useProSidebar();

    return (
        <Sidebar
            backgroundColor={theme.palette.background.secondary}
            style={{
                border: "none"
            }}
        >
            <Menu iconShape="square">
                <MenuItem
                    icon={<MenuOutlined />}
                    onClick={() => collapseSidebar()}
                    style={{
                        color: theme.palette.primary.secondary
                    }}
                >
                    <Typography variant="h4" >Navigation Menu</Typography>
                </MenuItem>
                <MenuItem
                    icon={<Home />}
                    style={{
                        color: theme.palette.primary.secondary
                    }}
                >
                    <Link to="/">
                        <Typography variant="h6" >Home</Typography>
                    </Link>
                </MenuItem>
                <MenuItem
                    icon={<TrendingUp />}
                    style={{
                        color: theme.palette.primary.secondary
                    }}
                >
                    <Link to="/trending">
                        <Typography variant="h6" >Trending</Typography>
                    </Link>
                </MenuItem>
                <MenuItem
                    icon={<ContactsRounded />}
                    style={{
                        color: theme.palette.primary.secondary
                    }}
                >
                    <Link to="/genres">
                        <Typography variant="h6" >Genres</Typography>
                    </Link>
                </MenuItem>
                <MenuItem
                    icon={<Search />}
                    style={{
                        color: theme.palette.primary.secondary
                    }}
                >
                    <Link to="/search">

                        <Typography variant="h6" >Search</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideNav;