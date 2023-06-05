import { MenuOutlined, Home, Star, Search, Category, Bookmark, Visibility } from "@mui/icons-material";
import { Button, Box, Input, Typography, useTheme, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { getIndividualFilm } from "../../services/TmdbServices";

const SideNav = () => {
    const [searchInput, setSearchInput] = useState("");
    const { setSearchedFilms } = useContext(TmdbContext);
    const theme = useTheme();
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();

    const onSearch = async () => {
        if (searchInput) {
            const searchResults = await getIndividualFilm(searchInput)
            setSearchedFilms({ headLine: searchInput, films: searchResults.results });
            navigate("/search");
        }
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
                <Tooltip
                    title={"Home"}
                    arrow
                >
                    <Link to="/">
                        <MenuItem
                            icon={<Home />}
                            style={{
                                color: theme.palette.primary.secondary
                            }}
                        >
                            <Typography variant="h6" >Home</Typography>
                        </MenuItem>
                    </Link>
                </Tooltip>
                <Tooltip
                    title={"Genres"}
                    arrow
                >
                    <SubMenu
                        icon={<Category />}
                        label="Genres"
                        style={{
                            color: theme.palette.primary.secondary
                        }}
                    >
                        <MenuItem
                            style={{
                                color: theme.palette.primary.secondary
                            }}
                        >
                            <Typography variant="h6" sx={{ color: theme.palette.primary.main }} >Genres</Typography>
                        </MenuItem>
                        <MenuItem
                            style={{
                                color: theme.palette.primary.secondary
                            }}
                        >
                            <Typography variant="h6" sx={{ color: theme.palette.primary.main }} >Genres</Typography>
                        </MenuItem>
                        <MenuItem
                            style={{
                                color: theme.palette.primary.secondary
                            }}
                        >
                            <Typography variant="h6" sx={{ color: theme.palette.primary.main }} >Genres</Typography>
                        </MenuItem>
                    </SubMenu>
                </Tooltip>
                <Tooltip
                    title={"Saved"}
                    arrow
                >
                    <Link to="/saved-films">
                        <MenuItem
                            icon={<Bookmark />}
                            style={{
                                color: theme.palette.primary.secondary
                            }}
                        >
                            <Typography variant="h6" >Saved</Typography>
                        </MenuItem>
                    </Link>
                </Tooltip>
                <Tooltip
                    title="Recently Viewed"
                    arrow
                >
                    <Link to="/recently-viewed">
                        <MenuItem
                            icon={<Visibility />}
                            style={{
                                color: theme.palette.primary.secondary
                            }}
                        >
                            <Typography variant="h6" >Recently Viewed</Typography>
                        </MenuItem>
                    </Link>
                </Tooltip>
                <Tooltip
                    title={"Recommendations"}
                    arrow
                >
                    <Link to="/recommendations">
                        <MenuItem
                            icon={<Star />}
                            style={{
                                color: theme.palette.primary.secondary
                            }}
                        >
                            <Typography variant="h6" >Recommendations</Typography>
                        </MenuItem>
                    </Link>
                </Tooltip>
                <Tooltip
                    title="Search"
                    arrow
                >
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
                                >
                                    Search
                                </Button>
                            </Box>
                        </MenuItem>
                    </SubMenu>
                </Tooltip>
            </Menu>
        </Sidebar>
    )
}

export default SideNav;