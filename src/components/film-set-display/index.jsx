import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

import FilmCard from "../../components/film-card";

import HorizontalScroll from "react-scroll-horizontal";
import style from "./style";

const FilmSetDisplay = ({ headLine, films }) => {
    const theme = useTheme();

    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={style.displayBorder(isBelowMd)}>
            <Typography
                variant="h2"
                sx={style.headlineBorder}
            >
                {headLine}
            </Typography>
            {
                isBelowMd
                    ?
                    <Box sx={style.mobileScrollBorder}>
                        {
                            films?.results
                                ? (
                                    films?.results.map(film => (
                                        film.poster_path && (film.media_type === "movie" || !film.hasOwnProperty("media_type"))
                                            ? <FilmCard film={film} />
                                            : null
                                    ))
                                )
                                : null
                        }
                    </Box>
                    :
                    <HorizontalScroll style={style.desktopScrollBorder} >
                        {
                            films?.results
                                ? (
                                    films?.results.map(film => (
                                        film.poster_path && (film.media_type === "movie" || !film.hasOwnProperty("media_type"))
                                            ? <FilmCard film={film} />
                                            : null
                                    ))
                                )
                                : null
                        }
                    </HorizontalScroll>
            }
        </Box>
    )
}

export default FilmSetDisplay;