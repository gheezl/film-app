import { MenuOutlined, Home, Star, Search, Category, Visibility, Brightness2 } from "@mui/icons-material";
import { Button, Box, Input, Typography, useTheme, Tooltip, createTheme } from "@mui/material";
import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { getIndividualFilm } from "../../services/TmdbServices";
import { toggleMode } from "../../styling/theme";

const SideNav = ({ setCurrentTheme, selectedMode, setSelectedMode }) => {
    const [searchInput, setSearchInput] = useState("");
    const { setSearchedFilms, genres } = useContext(TmdbContext);
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

    const onToggle = () => {
        setSelectedMode(selectedMode === "dark" ? "light" : "dark");
        setCurrentTheme(createTheme(toggleMode(selectedMode === "dark" ? "light" : "dark")));
    }

    return (
        <Sidebar
            backgroundColor={theme.palette.background.second}
            style={{
                border: "none"
            }}
        >
            <Menu iconShape="square">
                <MenuItem
                    icon={<MenuOutlined />}
                    onClick={() => collapseSidebar()}
                    style={{
                        color: theme.palette.primary.second
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
                                color: theme.palette.primary.second
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
                            color: theme.palette.primary.second
                        }}
                    >
                        {
                            genres && genres.map(genre => (
                                <Link to={`/genre/${genre.name}/${genre.id}`}>
                                    <MenuItem
                                        style={{
                                            color: theme.palette.primary.second
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ color: theme.palette.primary.main }} >{genre.name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))
                        }

                    </SubMenu>
                </Tooltip>
                <Tooltip
                    title="Recently Viewed"
                    arrow
                >
                    <Link to="/recently-viewed">
                        <MenuItem
                            icon={<Visibility />}
                            style={{
                                color: theme.palette.primary.second
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
                                color: theme.palette.primary.second
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
                            color: theme.palette.primary.second
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
                <Tooltip
                    title={`change theme to ${selectedMode}`}
                    arrow
                >
                    <MenuItem
                        icon={<Brightness2 />}
                        style={{
                            color: theme.palette.primary.second
                        }}
                        onClick={() => onToggle()}
                    >
                        <Typography variant="h6" >Toggle Theme</Typography>
                    </MenuItem>
                </Tooltip>
            </Menu>
        </Sidebar>
    )
}

export default SideNav;