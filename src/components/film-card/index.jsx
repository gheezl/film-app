import { Box, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const FilmCard = ({ film }) => {
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme()

    useEffect(() => {
        console.log(film)
    }, [film])

    return (
        <Tooltip
            title={film.title}
            arrow

        >
            <Paper
                elevation={isHovered ? 0 : 1}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    margin: "20px 10px 20px 10px",
                    backgroundColor: theme.palette.background.secondary,
                    padding: "15px",
                    borderRadius: "25px",
                    cursor: isHovered ? "pointer" : null
                }}
            >
                <img alt="alt" style={{ width: "200px", borderRadius: "25px" }} src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`} />
            </Paper>
        </Tooltip>
    )
}

export default FilmCard;