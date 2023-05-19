import { Paper, useTheme } from "@mui/material";
import { useEffect, } from "react";

const FilmCard = ({ film }) => {
    const theme = useTheme()

    useEffect(() => {
        console.log(film)
    }, [film])

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
            elevation={1}
            sx={{
                margin: "20px 10px 20px 10px",
                backgroundColor: theme.palette.background.secondary,
                padding: "15px",
                borderRadius: "25px"
            }}
        >
            <img alt="alt" style={{ width: "200px", borderRadius: "25px" }} src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`} />
        </Paper>
    )
}

export default FilmCard;