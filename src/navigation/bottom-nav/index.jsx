import { Box, BottomNavigation, BottomNavigationAction, useTheme, Input, Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@mui/material";
import { Brightness2, Home, Search, Star, Visibility } from "@mui/icons-material";
import { useContext, useState } from "react";
import { StylingContext } from "../../contexts/StylingProvider";
import { useNavigate } from "react-router-dom";
import { getIndividualFilm } from "../../services/TmdbServices";
import { TmdbContext } from "../../contexts/TmdbProvider";

import style from "./style";
import globalStyle from "../../styling/globalStyles";

const BottomNav = () => {
    const [value, setValue] = useState(0);
    const [searchInput, setSearchInput] = useState();
    const [open, setOpen] = useState(false);

    const theme = useTheme();
    const { toggleMode } = useContext(StylingContext);
    const { setSearchedFilms } = useContext(TmdbContext);
    const navigate = useNavigate();

    const onSearch = async () => {
        if (searchInput) {
            const searchResults = await getIndividualFilm(searchInput)
            setSearchedFilms({ headLine: searchInput, films: searchResults.results });
            navigate("/search");
        }
    }

    const handleNav = (event, newValue) => {
        if (newValue === 0) {
            navigate('/');
        }
        else if (newValue === 1) {
            navigate('/recently-viewed');
        }
        else if (newValue === 2) {
            navigate('/recommendations');
        }
        else if (newValue === 3) {
            toggleMode();
        }
        else if (newValue === 4) {
            setOpen(!open);
        }
        setValue(newValue)
    }

    return (
        <Box sx={style.navBorder} >
            <BottomNavigation
                value={value}
                onChange={handleNav}
                sx={globalStyle.setBackgroundColor(theme.palette.background.second)}
            >
                <BottomNavigationAction sx={globalStyle.setColor(theme.palette.primary.second)} icon={<Home />} />
                <BottomNavigationAction sx={globalStyle.setColor(theme.palette.primary.second)} icon={<Visibility />} />
                <BottomNavigationAction sx={globalStyle.setColor(theme.palette.primary.second)} icon={<Star />} />
                <BottomNavigationAction sx={globalStyle.setColor(theme.palette.primary.second)} icon={<Brightness2 />} />
                <BottomNavigationAction sx={globalStyle.setColor(theme.palette.primary.second)} icon={<Search />} />
            </BottomNavigation>
            <Dialog PaperProps={{ style: globalStyle.setBackgroundColor(theme.palette.background.second) }} open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Search for a film</DialogTitle>
                <DialogContent>
                    <Input
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder="Enter film"
                    />

                </DialogContent>
                <DialogActions>
                    {
                        searchInput
                            ?
                            <Button
                                onClick={() => {
                                    onSearch()
                                    setOpen(false)
                                }}
                            >
                                Search
                            </Button>
                            : null
                    }
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default BottomNav;