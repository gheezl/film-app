import { useContext, useEffect, useState, useRef } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, useTheme } from "@mui/material";
import ProgressCircle from "../../components/progress-circle";
import FullPageDisplay from "../../components/film-set-display-full-page";
import { getFilmById, getFilmsByGenre } from "../../services/TmdbServices";
import { getRandomItems, removeDuplicates } from "../../utilities/utilities";
import { useParams } from "react-router-dom";
import { getIndividualFilm } from "../../services/TmdbServices";
import BarChart from "../../components/bar-chart";
import ItemList from "../../components/item-list";
import { PlayCircle } from "@mui/icons-material";

const Film = ({ match }) => {
    const [releaseDate, setReleaseDate] = useState("");
    const [similarFilms, setSimilarFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState({});
    const [runTime, setRunTime] = useState("");
    const theme = useTheme();
    const { id } = useParams();

    // const pageRef = useRef();

    const scrollToTopOfPage = () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);
    }

    useEffect(() => {
        const getFilm = async () => {
            const film = await getFilmById(id);
            setSelectedFilm(film);
        }

        scrollToTopOfPage();
        getFilm();
    }, [id])

    useEffect(() => {
        setReleaseDate(new Date(selectedFilm.release_date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }))
        setRunTime(`${Math.floor(selectedFilm.runtime / 60)} hours and ${selectedFilm.runtime % 60} minutes`);

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
                            marginBottom: "35px"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="h1"
                            >
                                {selectedFilm.title}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    marginTop: "10px",
                                    color: theme.palette.primary.third
                                }}
                            >
                                {runTime}
                            </Typography>
                        </Box>

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
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
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
                                width: "min",
                                height: "100%",
                                marginRight: "25px",
                            }}
                        >
                            <Button
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    borderRadius: "25px"
                                }}
                            >
                                <PlayCircle sx={{
                                    fontSize: "150px"
                                }} />
                                <Typography variant="h2" >Play Film</Typography>
                            </Button>
                        </Paper>
                        <Paper
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: theme.palette.background.secondary,
                                padding: "15px",
                                borderRadius: "25px",
                                width: "min",
                                height: "100%",
                                marginRight: "25px",
                            }}
                        >
                            <ItemList items={selectedFilm.genres} headLine="Genres" />
                        </Paper>
                        <Paper
                            sx={{
                                gridColumn: "span 2",
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: theme.palette.background.secondary,
                                padding: "15px",
                                borderRadius: "25px",
                                width: "max",
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