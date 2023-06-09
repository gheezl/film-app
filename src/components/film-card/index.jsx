import { Box, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import { Link } from "react-router-dom";

const FilmCard = ({ film }) => {
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Tooltip
                title={
                    <Typography
                        variant="h4"
                        sx={{
                            margin: "5px"
                        }}
                    >
                        {film.title}
                    </Typography>
                }
                arrow
            >
                <Link to={`/film/${film.id}`} >
                    <Paper
                        elevation={isHovered ? 0 : 1}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        sx={{
                            margin: "20px 10px 20px 10px",
                            backgroundColor: theme.palette.background.second,
                            padding: "15px",
                            borderRadius: "25px",
                            cursor: isHovered ? "pointer" : null,
                            width: "fit-content",
                            height: "fit-content"
                        }}
                    >
                        <img alt="alt" style={{ width: "200px", borderRadius: "25px" }} src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`} />
                    </Paper>
                </Link >
            </Tooltip>
        </Box>
    )
}

export default FilmCard;