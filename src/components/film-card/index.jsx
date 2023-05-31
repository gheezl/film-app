import { Box, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { TmdbContext } from "../../contexts/TmdbProvider";

import { Link } from "react-router-dom";

const FilmCard = ({ film }) => {
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();
    const { selectFilm } = useContext(TmdbContext);

    return (
        <Link to={`/film/${film.id}`} >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Tooltip
                    title={film.title}
                    arrow
                >

                    <Paper
                        elevation={isHovered ? 0 : 1}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => selectFilm(film)}
                        sx={{
                            margin: "20px 10px 20px 10px",
                            backgroundColor: theme.palette.background.secondary,
                            padding: "15px",
                            borderRadius: "25px",
                            cursor: isHovered ? "pointer" : null,
                            width: "fit-content",
                            height: "fit-content"
                        }}
                    >
                        <img alt="alt" style={{ width: "200px", borderRadius: "25px" }} src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`} />
                    </Paper>
                </Tooltip>
            </Box>
        </Link >

    )
}

export default FilmCard;