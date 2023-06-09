import { useContext, useEffect, useState } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, Button, Paper, Typography, useTheme, Grid, useMediaQuery } from "@mui/material";
import ProgressCircle from "../../components/progress-circle";
import FullPageDisplay from "../../components/film-set-display-full-page";
import { getFilmById, getFilmsByGenre } from "../../services/TmdbServices";
import { getRandomItems, removeDuplicateObjects, formatDate, removeSpecificObject, formatRuntime } from "../../utilities/utilities";
import { useParams } from "react-router-dom";
import BarChart from "../../components/bar-chart";
import ItemList from "../../components/item-list";
import { PlayCircle } from "@mui/icons-material";
import InfoTooltip from "../../components/info-tooltip";

const Film = ({ match }) => {
    const [releaseDate, setReleaseDate] = useState("");
    const [similarFilms, setSimilarFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState({});
    const [runtime, setRuntime] = useState("");
    const [barData, setBarData] = useState([]);
    const theme = useTheme();

    // const isBelowXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isBelowSm = useMediaQuery(theme.breakpoints.down("sm"));
    // const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));

    const { id } = useParams();
    const { addFilmToRecentlyViewed } = useContext(TmdbContext);

    const scrollToTopOfPage = () => {
        window.scrollTo(0, 0);
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
                setBarData(
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
                setBarData([])
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
        // eslint-disable-next-line
    }, [selectedFilm])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isBelowLg ? "column" : "row",
                    padding: '20px',
                    marginBottom: '20px',

                }}
            >
                <Box sx={{ marginBottom: '20px', marginRight: isBelowLg ? "0px" : "25px" }}>
                    <Paper
                        sx={{
                            backgroundColor: theme.palette.background.second,
                            padding: '15px',
                            borderRadius: '25px',
                            width: 'fit-content',
                            height: 'fit-content',
                            mx: 'auto', // Center horizontally
                        }}
                    >
                        <img
                            alt="alt"
                            style={{ width: isBelowSm ? "100%" : "450px", borderRadius: '25px' }}
                            src={`https://image.tmdb.org/t/p/w1280${selectedFilm.poster_path}`}
                        />
                    </Paper>
                </Box>

                <Grid container spacing={2}>
                    {/* Header */}
                    <Grid item xs={12} md={12}>
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.second,
                                padding: '30px 15px',
                                borderRadius: '25px',
                                display: 'flex',
                                flexDirection: isBelowLg ? "column" : "row",
                                gap: "10px",
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h1">{selectedFilm.title}</Typography>
                                <Typography
                                    variant="h4"
                                    sx={{ marginTop: '10px', color: theme.palette.primary.third }}
                                >
                                    {runtime}
                                </Typography>
                            </Box>
                            <Typography variant="h1">{releaseDate}</Typography>
                        </Paper>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12} md={12} lg={6} xl={8}>
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.second,
                                padding: '15px',
                                borderRadius: '25px',
                                height: '250px',
                                overflowY: 'scroll',
                                flex: '1',
                            }}
                        >
                            {
                                selectedFilm.overview
                                    ?
                                    <Box>
                                        <Typography variant="h2" sx={{ marginBottom: "10px" }} >Description</Typography>
                                        <Typography variant="h3">
                                            {selectedFilm.overview}
                                        </Typography>
                                    </Box>
                                    : <Typography variant="h2" >No description to display.</Typography>
                            }

                        </Paper>

                    </Grid>

                    {/* Rating */}
                    <Grid item xs={12} md={6} lg={6} xl={4} >
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.second,
                                padding: '15px',
                                borderRadius: '25px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                height: '250px'
                            }}
                        >
                            <ProgressCircle
                                progress={selectedFilm.vote_average}
                                votes={selectedFilm.vote_count ? selectedFilm.vote_count : 0}
                                size="200"
                            />
                        </Paper>
                    </Grid>

                    {/* Play Button */}
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.second,
                                padding: '15px',
                                borderRadius: '25px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                height: '250px'
                            }}
                        >
                            <Button
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    borderRadius: '25px',
                                }}
                                onClick={() => window.open(selectedFilm.homepage, '_blank')}
                            >
                                <PlayCircle sx={{ fontSize: '150px' }} />
                                <Typography variant="h2">Play Film</Typography>
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Film Details */}
                    <Grid item xs={12} md={12} lg={4}>
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.second,
                                padding: '15px',
                                borderRadius: '25px',
                                height: '250px',
                                overflowY: 'scroll',
                            }}
                        >
                            <ItemList items={selectedFilm.genres} headLine="Genres" />
                            <ItemList items={selectedFilm.spoken_languages} headLine="Spoken Languages" />
                            <ItemList items={selectedFilm.production_companies} headLine="Production Companies" />
                        </Paper>
                    </Grid>

                    {/* Financial Performance */}
                    <Grid item xs={12} md={12} lg={5}>
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.second,
                                padding: '15px',
                                borderRadius: '25px',
                                height: '250px',
                                // overflowY: 'scroll',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Typography variant="h2">Financial Performance</Typography>
                                    <InfoTooltip text="We use the standard method of calculating a film's profitability threshold by multiplying its budget by 2.5 as a way of factoring in uncounted expenses such as marketing. Usually, in other words, in order for a film to break even, its revenue must exceed its budget by 2.5 times." />
                                </Box>
                                {barData[0] ? (
                                    <BarChart data={barData} />
                                ) : (
                                    <Typography sx={{ color: theme.palette.primary.third }} variant="h4">
                                        Insufficient data.
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <FullPageDisplay
                headLine="Similar Films"
                alternateHeadline="No Similar Films to Display"
                films={similarFilms}
                showInfo={false}
            />
        </Box>
    )
}

export default Film;