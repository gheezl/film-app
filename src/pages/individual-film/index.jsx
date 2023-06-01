import { useContext, useEffect, useState, useRef } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, useTheme } from "@mui/material";
import ProgressCircle from "../../components/progress-circle";
import FullPageDisplay from "../../components/film-set-display-full-page";
import { getFilmById, getFilmsByGenre } from "../../services/TmdbServices";
import { getRandomItems, removeDuplicates } from "../../utilities/utilities";
import { useParams } from "react-router-dom";
import { getIndividualFilm } from "../../services/TmdbServices";
import BarChart from "../../components/bar-chart";

const Film = ({ match }) => {
    const [releaseDate, setReleaseDate] = useState("");
    const [similarFilms, setSimilarFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState({});
    const theme = useTheme();
    const { id } = useParams();

    // const pageRef = useRef();

    const scrollToTopOfPage = () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
            console.log("End")
        }, 1000);
    }

    useEffect(() => {
        const getFilm = async () => {
            const film = await getFilmById(id);
            setSelectedFilm(film);
        }

        console.log("Start")
        scrollToTopOfPage();

        getFilm();
    }, [id])

    useEffect(() => {
        setReleaseDate(new Date(selectedFilm.release_date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }))

        const getSimilarFilms = async () => {
            setSimilarFilms([]);
            if (selectedFilm.genres) {
                const promises = selectedFilm.genres.map(async (genre) => {
                    const films = await getFilmsByGenre(genre.id);
                    return getRandomItems(films.results, 5);
                });

                const results = await Promise.all(promises);
                const mergedResults = [].concat(...results);
                const filteredResults = removeDuplicates(mergedResults);
                setSimilarFilms((prevSimilarFilms) => prevSimilarFilms.concat(filteredResults));
            }
        }

        getSimilarFilms();
    }, [selectedFilm])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        // ref={pageRef}
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

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            height: "100%",
                            width: "100%"
                        }}
                    >
                        <Paper
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: theme.palette.background.secondary,
                                padding: "15px",
                                borderRadius: "25px",
                                width: "50%",
                                height: "100%",
                                marginRight: "25px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography variant="h2">Genres</Typography>
                                <List

                                >
                                    {
                                        selectedFilm.genres
                                            ? selectedFilm.genres.map(genre => (
                                                <ListItem
                                                    sx={{
                                                        padding: "5px 0px 5px 10px"
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <span
                                                            style={{
                                                                width: "8px",
                                                                height: "8px",
                                                                borderRadius: "50%",
                                                                backgroundColor: theme.palette.primary.secondary,
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        sx={{
                                                            margin: "0px 0px 0px -35px",
                                                        }}
                                                        primary={genre.name}
                                                    />
                                                </ListItem>
                                            ))
                                            : null
                                    }
                                </List>
                            </Box>
                        </Paper>
                        <Paper
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: theme.palette.background.secondary,
                                padding: "15px",
                                borderRadius: "25px",
                                width: "50%",
                                height: "100%",
                                marginRight: "25px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                                onClick={() => scrollToTopOfPage()}
                            >
                                {/* <BarChart data={{}} /> */}
                                <Typography variant="h2">Financials</Typography>
                                <Typography variant="h3">Budget: ${selectedFilm.budget?.toLocaleString()}</Typography>
                                <Typography variant="h3">Revenue: ${selectedFilm.revenue?.toLocaleString()}</Typography>
                                <Typography variant="h3">Profit: ${(selectedFilm.revenue - (selectedFilm.budget * 2.5)).toLocaleString()}</Typography>
                            </Box>
                        </Paper>
                    </Box>

                </Box>
            </Box>
            <FullPageDisplay headLine="Similar Films" films={similarFilms} />
        </Box>

    )
}

export default Film;