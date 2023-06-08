import { MenuOutlined, Home, Star, Search, Category, Visibility, Brightness2 } from "@mui/icons-material";
import { Button, Box, Input, Typography, useTheme, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { StylingContext } from "../../contexts/StylingProvider";
import { getIndividualFilm } from "../../services/TmdbServices";

const SideNav = () => {
    const [searchInput, setSearchInput] = useState("");
    const { setSearchedFilms, genres } = useContext(TmdbContext);
    const { toggleMode, currentMode } = useContext(StylingContext);
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
            backgroundColor={theme.palette.background.second}
            style={{
                border: "none",
            }}
        // transitionDuration={500}
        >
            <Menu
                iconShape="square"
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0) {
                            return {
                                // color: disabled ? "#eee" : "#455A64",
                                // backgroundColor: active ? "#fff" : undefined,
                                "&:hover": {
                                    backgroundColor: `${theme.palette.background.fourth} !important`,
                                    // color: "white !important",
                                    // borderRadius: "8px !important",
                                    // fontWeight: "bold !important" /
                                },
                            };
                        }
                    },
                }}
            >
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
                        icon={<Category style={{ color: theme.palette.primary.second }} />}
                        label="Genres"
                    >
                        {
                            genres && genres.map(genre => (
                                <Link to={`/genre/${genre.name}/${genre.id}`}>
                                    <MenuItem
                                        style={{
                                            backgroundColor: theme.palette.background.third
                                        }}
                                    >
                                        <Typography variant="h6" >{genre.name}</Typography>
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
                        icon={<Search style={{ color: theme.palette.primary.second }} />}
                        label="Search"
                    >
                        <MenuItem
                            style={{ backgroundColor: theme.palette.background.fourth }}>
                            <Box sx={{ display: "flex", flexDirection: "row", }}>
                                <Input
                                    value={searchInput}
                                    onChange={e => setSearchInput(e.target.value)}
                                    placeholder="Enter film"
                                    onKeyPress={event => {
                                        if (event.key === "Enter") {
                                            onSearch()
                                        }
                                    }}
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
                    title={`change theme to ${currentMode === "dark" ? "light" : "dark"}`}
                    arrow
                >
                    <MenuItem
                        icon={<Brightness2 />}
                        style={{
                            color: theme.palette.primary.second,
                        }}
                        onClick={() => toggleMode()}
                    >
                        <Typography variant="h6" >Change theme to {currentMode === "dark" ? "light" : "dark"}</Typography>
                    </MenuItem>
                </Tooltip>
            </Menu>
        </Sidebar >
    )
}

export default SideNav;