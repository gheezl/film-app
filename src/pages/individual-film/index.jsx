import { useContext, useEffect, useState, useRef } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, Button, Tooltip, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, useTheme } from "@mui/material";
import ProgressCircle from "../../components/progress-circle";
import FullPageDisplay from "../../components/film-set-display-full-page";
import { getFilmById, getFilmsByGenre } from "../../services/TmdbServices";
import { getRandomItems, removeDuplicateObjects, formatDate, removeSpecificObject, formatRuntime } from "../../utilities/utilities";
import { useParams } from "react-router-dom";
import BarChart from "../../components/bar-chart";
import ItemList from "../../components/item-list";
import { PlayCircle, InfoOutlined, Bookmark, BookmarkOutlined, BookmarkBorder } from "@mui/icons-material";
import InfoTooltip from "../../components/info-tooltip";

const Film = ({ match }) => {
    const [releaseDate, setReleaseDate] = useState("");
    const [similarFilms, setSimilarFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState({});
    const [runtime, setRuntime] = useState("");
    const [mockBarData, setMockBarData] = useState([]);
    const theme = useTheme();
    const { id } = useParams();
    const { addFilmToRecentlyViewed } = useContext(TmdbContext);

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
        if (selectedFilm.release_date) {
            setReleaseDate(formatDate(selectedFilm.release_date));
            addFilmToRecentlyViewed(selectedFilm);
        }
        setRuntime(formatRuntime(selectedFilm.runtime));

        const determineFinancialPerformance = () => {
            if (selectedFilm.budget && selectedFilm.revenue && selectedFilm.revenue - (selectedFilm.budget * 2.5)) {
                setMockBarData(
                    [
                        {
                            category: "Budget",
                            type: selectedFilm.budget,
                            typeColor: theme.palette.primary.second,
                        },
                        {
                            category: "Revenue",
                            type: selectedFilm.revenue,
                            typeColor: theme.palette.primary.second,
                        },
                        {
                            category: "Profit",
                            type: selectedFilm.revenue - (selectedFilm.budget * 2.5),
                            typeColor: selectedFilm.revenue - (selectedFilm.budget * 2.5) < 0 ? theme.palette.error.third : theme.palette.primary.second,
                        },
                    ]
                )
            }
            else {
                setMockBarData([])
            }
        }

        const getSimilarFilms = async () => {
            setSimilarFilms([]);
            if (selectedFilm.genres) {
                const promises = selectedFilm.genres.map(async (genre) => {
                    const films = await getFilmsByGenre(genre.id);
                    return getRandomItems(films.results, 5);
                });

                const results = await Promise.all(promises);
                const mergedResults = [].concat(...results);
                const withoutDuplicateObjects = removeDuplicateObjects(mergedResults, "title");
                const withoutSelectedFilm = removeSpecificObject(withoutDuplicateObjects, selectedFilm.title);
                setSimilarFilms((prevSimilarFilms) => prevSimilarFilms.concat(withoutSelectedFilm));
            }
        }

        determineFinancialPerformance();
        getSimilarFilms();
    }, [selectedFilm])

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
                        sx={{
                            margin: "20px 10px 20px 10px",
                            backgroundColor: theme.palette.background.second,
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
                        gridTemplateRows: "repeat(2, auto)",
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
                            backgroundColor: theme.palette.background.second,
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
                            <Typography variant="h1" >{selectedFilm.title}</Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    marginTop: "10px",
                                    color: theme.palette.primary.third
                                }}
                            >
                                {runtime}
                            </Typography>
                        </Box>
                        <Typography
                            variant="h1"
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
                                backgroundColor: theme.palette.background.second,
                                padding: "15px",
                                borderRadius: "25px",
                                height: "250px",
                                width: "100%",
                                overflowY: "scroll",

                            }}
                        >
                            <Typography
                                variant="h2"
                            >
                                {selectedFilm.overview ? selectedFilm.overview : "No description to display."}
                            </Typography>
                        </Paper>
                        <Box>
                            <ProgressCircle
                                progress={selectedFilm.vote_average}
                                votes={selectedFilm.vote_count ? selectedFilm.vote_count : 0}
                                size="250"
                            />
                        </Box>
                    </Box>
                    {/* //! This is the play button */}
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: theme.palette.background.second,
                            padding: "15px",
                            borderRadius: "25px",
                            width: "min",
                            height: "100%",
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
                            onClick={() => window.open(selectedFilm.homepage, "_blank")}
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
                            backgroundColor: theme.palette.background.second,
                            padding: "15px",
                            borderRadius: "25px",
                            height: "250px",
                            overflowY: "scroll",
                            gridColumn: "2 / 5"
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
                            backgroundColor: theme.palette.background.second,
                            padding: "15px",
                            borderRadius: "25px",
                            width: "100%",
                            height: "100%",
                            marginRight: "25px",
                            gridColumn: "5 / 9"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "224px",
                                width: "100%"
                            }}
                            onClick={() => scrollToTopOfPage()}
                        >
                            <Box
                                sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                            >
                                <Typography variant="h2" >Financial Performance</Typography>
                                <InfoTooltip text="We use the standard method of calculating a film's profitablity threshold by multiplying it's budget by 2.5 as a way of factoring in uncounted expenses such as marketing. Usually, in other words, in order for a film to break even, it's revenue must exceed it's budget by 2.5 times." />
                            </Box>

                            {
                                mockBarData[0]
                                    ? <BarChart data={mockBarData} />
                                    : <Typography sx={{ color: theme.palette.primary.third }} variant="h4">Insufficient data.</Typography>
                            }
                        </Box>
                    </Paper>
                </Box>
            </Box>
            <FullPageDisplay headLine="Similar Films" alternateHeadline="No Similar Films to Display" films={similarFilms} showInfo={false} />
        </Box>

    )
}

export default Film;