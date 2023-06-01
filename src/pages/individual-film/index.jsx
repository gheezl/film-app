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

    //! WILL REMOVE LATER
    const mockBarData = [
        {
            country: "Budget",
            "hot dog": 137,
            "hot dogColor": "hsl(229, 70%, 50%)",
            burger: 96,
            burgerColor: "hsl(296, 70%, 50%)",
            kebab: 72,
            kebabColor: "hsl(97, 70%, 50%)",
            donut: 140,
            donutColor: "hsl(340, 70%, 50%)",
        },
        {
            country: "Revenue",
            "hot dog": 55,
            "hot dogColor": "hsl(307, 70%, 50%)",
            burger: 28,
            burgerColor: "hsl(111, 70%, 50%)",
            kebab: 58,
            kebabColor: "hsl(273, 70%, 50%)",
            donut: 29,
            donutColor: "hsl(275, 70%, 50%)",
        },
        {
            country: "Profit",
            "hot dog": 109,
            "hot dogColor": "hsl(72, 70%, 50%)",
            burger: 23,
            burgerColor: "hsl(96, 70%, 50%)",
            kebab: 34,
            kebabColor: "hsl(106, 70%, 50%)",
            donut: 152,
            donutColor: "hsl(256, 70%, 50%)",
        },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    padding: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",

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
                        display: "grid",
                        gridTemplateColumns: "repeat(8, 1fr)",
                        gridTemplateRows: "repeat(3, auto)",
                        griAutoRows: "100px",
                        gap: "25px",
                        padding: "25px",
                    }}
                >
                    {/* //! This is the header */}
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: theme.palette.background.secondary,
                            padding: "30px 15px 30px 15px",
                            borderRadius: "25px",
                            width: "100%",
                            marginRight: "25px",
                            gridColumn: "span 8",
                            gridRow: "span 1",
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
                    {/* //! This is the description and the rating */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            gridColumn: "span 8"
                        }}
                    >
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.secondary,
                                padding: "15px",
                                borderRadius: "25px",
                                height: "250px",
                                // width: "100%",
                                overflowY: "scroll",

                            }}
                        >
                            <Typography
                                variant="h2"
                            >
                                {selectedFilm.overview}
                            </Typography>
                        </Paper>
                        <Box>
                            {
                                selectedFilm.vote_average
                                    ? <ProgressCircle progress={selectedFilm.vote_average.toFixed(1)} votes={selectedFilm.vote_count} size="250" />
                                    : null
                            }
                        </Box>
                    </Box>
                    {/* //! This is the play button */}
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: theme.palette.background.secondary,
                            padding: "15px",
                            borderRadius: "25px",
                            width: "min",
                            height: "100%",
                            // marginRight: "25px",
                            gridColumn: "1 / 2"
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
                    {/* //! These are the film details */}
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            backgroundColor: theme.palette.background.secondary,
                            padding: "15px",
                            borderRadius: "25px",
                            width: "100%",
                            height: "250px",
                            overflowY: "scroll",
                            // marginRight: "25px",
                            gridColumn: "2 / 4"
                        }}
                    >
                        <ItemList items={selectedFilm.genres} headLine="Genres" />
                        <ItemList items={selectedFilm.spoken_languages} headLine="Spoken Languages" />
                        <ItemList items={selectedFilm.production_companies} headLine="Production Companies" />
                    </Paper>
                    <Paper
                        sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: theme.palette.background.secondary,
                            padding: "15px",
                            borderRadius: "25px",
                            width: "100%",
                            height: "100%",
                            marginRight: "25px",
                            gridColumn: "4 / 9"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "250px",
                                width: "100%"
                            }}
                            onClick={() => scrollToTopOfPage()}
                        >
                            <Typography variant="h2">Financials</Typography>
                            <BarChart data={mockBarData} />
                            {/* <Typography variant="h3">Budget: ${selectedFilm.budget?.toLocaleString()}</Typography>
                            <Typography variant="h3">Revenue: ${selectedFilm.revenue?.toLocaleString()}</Typography>
                            <Typography variant="h3">Profit: ${(selectedFilm.revenue - (selectedFilm.budget * 2.5)).toLocaleString()}</Typography> */}
                        </Box>
                    </Paper>
                </Box>
            </Box>
            <FullPageDisplay headLine="Similar Films" films={similarFilms} />
        </Box>

    )
}

export default Film;