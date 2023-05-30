import { useContext, useEffect, useState } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import ProgressCircle from "../../components/progress-circle";
import FullPageDisplay from "../../components/film-set-display-full-page";
import { getFilmsByGenre } from "../../services/TmdbServices";
import { getRandomItems, removeDuplicates } from "../../utilities/utilities";

const Film = () => {
    const [releaseDate, setReleaseDate] = useState("");
    const [similarFilms, setSimilarFilms] = useState([]);
    const { selectedFilm } = useContext(TmdbContext);
    const theme = useTheme();

    useEffect(() => {
        const formatedDate = new Date(selectedFilm.release_date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        })
        setReleaseDate(formatedDate)

        const getSimilarFilms = async () => {
            const promises = selectedFilm.genre_ids.map(async (genreId) => {
                const films = await getFilmsByGenre(genreId);
                return getRandomItems(films.results, 5);
            });

            const results = await Promise.all(promises);
            const mergedResults = [].concat(...results);
            const filteredResults = removeDuplicates(mergedResults);
            console.log(mergedResults);
            setSimilarFilms((prevSimilarFilms) => prevSimilarFilms.concat(filteredResults));
        }

        getSimilarFilms();
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
                sx={{
                    padding: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box>
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
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "25px"
                    }}
                >
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: theme.palette.background.secondary,
                            padding: "30px 15px 30px 15px",
                            borderRadius: "25px",
                            width: "100%",
                            marginRight: "25px",
                            marginBottom: "50px"
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
                            {releaseDate}
                        </Typography>
                    </Paper>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            marginBottom: "50px"
                        }}
                    >
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.secondary,
                                padding: "15px",
                                borderRadius: "25px",
                                width: "fit-content",
                                height: "100%",
                                width: "100%",
                                marginRight: "25px"
                            }}
                        >
                            <Typography
                                variant="h2"
                            >
                                {selectedFilm.overview}
                            </Typography>
                        </Paper>
                        {
                            selectedFilm.vote_average
                                ? <ProgressCircle progress={selectedFilm.vote_average.toFixed(1)} votes={selectedFilm.vote_count} size="250" />
                                : null
                        }
                    </Box>

                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: theme.palette.background.secondary,
                            padding: "15px",
                            borderRadius: "25px",
                            width: "100%",
                            height: "100%",
                            marginRight: "25px",
                            // marginBottom: "50px"
                        }}
                    >
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
                    </Paper>

                </Box>
            </Box>
            <FullPageDisplay headLine="Similar Films" films={similarFilms} />
        </Box>

    )
}

export default Film;