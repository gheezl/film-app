import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";

const FilmCard = ({ film }) => {
    const theme = useTheme()

    useEffect(() => {
        console.log(film)
    }, [film])

    return (
        <Paper
            elevation={10}
            sx={{
                margin: "20px 20px 20px 0px",
                width: "5000px",
                backgroundColor: theme.palette.background.secondary,
                padding: "20px",
                borderRadius: "25px"
            }}
        >
            <img src={film.background_path} />
            <Typography variant="h3">{film.title}</Typography>
        </Paper>
    )
}

export default FilmCard;