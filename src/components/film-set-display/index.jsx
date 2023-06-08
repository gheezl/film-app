import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

import FilmCard from "../../components/film-card";

// import HorizontalScroll from "react-scroll-horizontal";

const FilmSetDisplay = ({ headLine, films }) => {
    const theme = useTheme();

    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ padding: isBelowMd ? "0px 0px 20px 0px" : "20px", margin: isBelowMd ? "0px -20px 0px -20px" : "0px" }}>
            <Typography
                variant="h2"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "-15px 0px 10px 0px",
                }}
            >
                {headLine}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    overflowX: "scroll",
                    height: "380px",
                    borderLeft: isBelowMd ? "none" : `1px solid ${theme.palette.primary.second}`,
                    borderRight: isBelowMd ? "none" : `1px solid ${theme.palette.primary.second}`,
                    borderRadius: "20px",
                    padding: "0px 10px 0px 10px"
                }}
            >
                {
                    films?.results
                        ? (
                            films?.results.map(film => (
                                film.poster_path
                                    ? <FilmCard film={film} />
                                    : null
                            ))
                        )
                        : null
                }
            </Box>

            {/* <HorizontalScroll
                style={{
                    height: "380px",
                    borderLeft: isBelowMd ? "none" : `1px solid ${theme.palette.primary.second}`,
                    borderRight: isBelowMd ? "none" : `1px solid ${theme.palette.primary.second}`,
                    borderRadius: "20px",
                    padding: "0px 10px 0px 10px"
                }}
            >
                {
                    films?.results
                        ? (
                            films?.results.map(film => (
                                film.poster_path
                                    ? <FilmCard film={film} />
                                    : null
                            ))
                        )
                        : null
                }
            </HorizontalScroll> */}
        </Box>
    )
}

export default FilmSetDisplay;