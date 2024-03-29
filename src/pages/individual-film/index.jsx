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
import { useSpring, animated } from "@react-spring/web";
import Loader from "../../components/loader";

import styles from "./style";

const Film = ({ match }) => {
    const [releaseDate, setReleaseDate] = useState("");
    const [similarFilms, setSimilarFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState({});
    const [runtime, setRuntime] = useState("");
    const [barData, setBarData] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const theme = useTheme();

    // const isBelowXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isBelowSm = useMediaQuery(theme.breakpoints.down("sm"));
    // const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));

    const { id } = useParams();
    const { addFilmToRecentlyViewed } = useContext(TmdbContext);

    const fadeAnimation = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 750 }
    })

    useEffect(() => {
        let mounted = true;

        const getFilm = async () => {
            const film = await getFilmById(id);
            if (mounted) {
                setSelectedFilm(film);
            }
        }

        getFilm();

        return () => {
            mounted = false;
        }
    }, [id])

    useEffect(() => {
        if (selectedFilm.release_date) {
            setReleaseDate(formatDate(selectedFilm.release_date));
            addFilmToRecentlyViewed(selectedFilm);
        }
        setRuntime(formatRuntime(selectedFilm.runtime));

        const determineFinancials = () => {
            const profit = selectedFilm.revenue - (selectedFilm.budget * 2.5)

            if (selectedFilm.budget && selectedFilm.revenue && profit) {
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
                            type: profit,
                            typeColor: profit < 0 ? theme.palette.error.third : theme.palette.primary.second,
                        },
                    ]
                )
            }
            else {
                setBarData([])
            }
        }

        const determineReviews = () => {
            setProgressData([
                {
                    id: `${(selectedFilm.vote_average * 10).toFixed(0)} %`,
                    label: "Favorable",
                    value: (selectedFilm.vote_average * 10).toFixed(0),
                },
                {
                    id: `${(100 - selectedFilm.vote_average * 10).toFixed(0)} %`,
                    label: "Unfavorable",
                    value: (100 - selectedFilm.vote_average * 10).toFixed(0),
                },
            ])
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

        determineFinancials();
        determineReviews();
        getSimilarFilms();
        // eslint-disable-next-line
    }, [selectedFilm])

    if (selectedFilm.poster_path) {
        return (
            <Box sx={styles.pageBorder}>
                <animated.div
                    style={{
                        ...fadeAnimation,
                        ...styles.animationDiv(isBelowLg)
                    }}
                >
                    <Box sx={styles.imageBorder(isBelowLg)}>
                        <Paper sx={styles.imageCard} >
                            <img
                                alt="alt"
                                style={styles.image(isBelowSm)}
                                src={`https://image.tmdb.org/t/p/w1280${selectedFilm.poster_path}`}
                            />
                        </Paper>
                    </Box>
                    <Grid height={isBelowLg ? "100%" : "405px"} container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Paper sx={styles.headerBorder(isBelowLg)} >
                                <Box>
                                    <Typography variant="h1">{selectedFilm.title}</Typography>
                                    <Typography
                                        variant="h4"
                                        sx={styles.headerRunTime}
                                    >
                                        {runtime}
                                    </Typography>
                                </Box>
                                <Typography variant="h1">{releaseDate}</Typography>
                            </Paper>
                        </Grid>
                        {/* Description */}
                        <Grid item xs={12} md={12} lg={6} xl={8}>
                            <Paper sx={styles.desciptionBorder}>
                                {
                                    selectedFilm.overview
                                        ?
                                        <Box>
                                            <Typography variant="h2" sx={styles.descriptionHeader} >Description</Typography>
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
                            {
                                selectedFilm.vote_count
                                    ?
                                    <Paper sx={styles.ratingBorder}>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                justifyContent: "start"
                                            }}
                                        >
                                            <Typography
                                                variant="h2"
                                            >
                                                {selectedFilm.vote_count.toLocaleString()} reviews
                                            </Typography>
                                        </Box>
                                        <ProgressCircle
                                            data={progressData}
                                            votes={selectedFilm.vote_count ? selectedFilm.vote_count : 0}
                                        />
                                    </Paper>
                                    :
                                    <Paper sx={styles.ratingBorder}>
                                        <Box sx={styles.noReviewsBorder} >
                                            <Typography variant="h2" >
                                                No reviews
                                            </Typography>
                                        </Box>
                                    </Paper>
                            }

                        </Grid>
                        {/* Play Button */}
                        <Grid item xs={12} md={6} lg={3}>
                            <Paper
                                sx={styles.playButtonBorder}
                            >
                                <Button
                                    sx={styles.playButton}
                                    onClick={() => window.open(selectedFilm.homepage, '_blank')}
                                >
                                    <PlayCircle sx={styles.playIcon} />
                                    <Typography variant="h2">Play Film</Typography>
                                </Button>
                            </Paper>
                        </Grid>
                        {/* Film Details */}
                        <Grid item xs={12} md={12} lg={4}>
                            <Paper
                                sx={styles.detailsBorder}
                            >
                                <ItemList items={selectedFilm.genres} headLine="Genres" />
                                <ItemList items={selectedFilm.spoken_languages} headLine="Spoken Languages" />
                                <ItemList items={selectedFilm.production_companies} headLine="Production Companies" />
                            </Paper>
                        </Grid>
                        {/* Financial Performance */}
                        <Grid item xs={12} md={12} lg={5}>
                            <Paper
                                sx={styles.financialPerformanceBorder}
                            >
                                <Box sx={styles.chartBorder}>
                                    <Box sx={styles.chartHeader}>
                                        <Typography variant="h2">Financials</Typography>
                                        <InfoTooltip text="We use the standard method of calculating a film's profitability threshold by multiplying its budget by 2.5 as a way of factoring in uncounted expenses such as marketing. Usually, in other words, in order for a film to break even, its revenue must exceed its budget by 2.5 times." />
                                    </Box>
                                    {barData[0] ? (
                                        <BarChart data={barData} />
                                    ) : (
                                        <Typography sx={styles.insufficientData} variant="h4">
                                            Insufficient data.
                                        </Typography>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </animated.div>
                <FullPageDisplay
                    headLine="Similar Films"
                    alternateHeadline="No Similar Films to Display"
                    films={similarFilms}
                    showInfo={false}
                />
            </Box >
        )
    }
    else {
        return <Loader />
    }
}

export default Film;