import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getGenre } from "../../services/tmdbServices";

const FilmCard = ({ film }) => {
    const [genres, setGenres] = useState([]);

    const theme = useTheme()

    useEffect(() => {
        console.log(film)
    }, [])

    // this is meant to get the ids of the film so that we can display them
    // useEffect(() => {
    //     let mounted = true;

    //     const fetchData = async () => {
    //         try {
    //             let filmGenres = [];
    //             film.genre_ids.map(genreId => {
    //                 filmGenres.push(getGenre(genreId));
    //             })
    //             if (mounted) {
    //                 setGenres(filmGenres);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();

    //     return () => {
    //         mounted = false
    //     };
    // }, [film])

    return (
        <Paper
            elevation={10}
            sx={{
                margin: "20px 20px 20px 0px",
                width: "500px",
                backgroundColor: theme.palette.background.secondary,
                padding: "15px",
                borderRadius: "25px"
            }}
        >
            <img style={{ width: "200px", borderRadius: "25px" }} src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`} />
            <Typography variant="h3">{film.title}</Typography>
        </Paper>
    )
}

export default FilmCard;