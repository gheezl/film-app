import { MenuOutlined, Home, TrendingUp, ContactsRounded, Search, } from "@mui/icons-material";
import { Button, Box, Input, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { TmdbContext, TmdbProvider } from "../../contexts/TmdbProvider";
import { getIndividualFilm } from "../../services/TmdbServices";

const SideNav = () => {
    const [searchInput, setSearchInput] = useState("");
    const { setSearchedFilms } = useContext(TmdbContext);
    const theme = useTheme();
    const { collapseSidebar } = useProSidebar();

    const onSearch = async () => {
        const searchResults = await getIndividualFilm(searchInput)
        setSearchedFilms({ headLine: searchInput, films: searchResults.results });
    }

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
                    <Link to="/recently-viewed">
                        <Typography variant="h6" >Recently Viewed</Typography>
                    </Link>
                </MenuItem>
                <SubMenu
                    icon={<Search />}
                    label="Search"
                    style={{
                        color: theme.palette.primary.secondary
                    }}
                >
                    <MenuItem>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Input
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                placeholder="Search for a film"
                            />
                            <Button
                                onClick={() => onSearch()}
                            >Search</Button>
                        </Box>
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}

export default SideNav;