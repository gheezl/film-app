import { useContext, useEffect, useState } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const Film = () => {
    const [releaseDate, setReleaseDate] = useState("");
    const { selectedFilm } = useContext(TmdbContext);
    const theme = useTheme();

    useEffect(() => {
        console.log(selectedFilm)
        const formatedDate = new Date(selectedFilm.release_date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        })
        setReleaseDate(formatedDate)
    }, [selectedFilm])

    return (
        <Box
            sx={{
                padding: "20px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between"
            }}
        >
            {/* this will show the image */}
            <Box
            >
                <Paper
                    elevation={1}
                    sx={{
                        margin: "20px 10px 20px 10px",
                        backgroundColor: theme.palette.background.secondary,
                        padding: "15px",
                        borderRadius: "25px",
                        width: "fit-content",
                        height: "fit-content"
                    }}
                >
                    <img alt="alt" style={{ width: "450px", borderRadius: "25px" }} src={`https://image.tmdb.org/t/p/w1280${selectedFilm.poster_path}`} />
                </Paper>
            </Box>

            <Box
                sx={{
                    border: "1px solid white",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "25px"
                }}
            >
                <Typography
                    variant="h1"
                >
                    {selectedFilm.title}
                </Typography>
                <Typography
                    variant="h2"
                >
                    Release Date: {releaseDate}
                </Typography>
                <Typography
                    variant="h2"
                >
                    Audience Score: {selectedFilm.vote_average}/10
                </Typography>
                <Typography
                    variant="h2"
                >
                    Vote Count: {selectedFilm.vote_count}
                </Typography>
                <Typography
                    variant="h2"
                >
                    {selectedFilm.overview}
                </Typography>
                <Typography
                    variant="h2"
                >
                    Film Popularity: {selectedFilm.popularity}
                </Typography>
                <Typography
                    variant="h2"
                >
                    {selectedFilm.adult ? "Is an Adult Film" : "Not an Adult Film"}
                </Typography>
            </Box>
        </Box>
    )
}

export default Film;