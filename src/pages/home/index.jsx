import { useContext, useEffect } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, Typography } from "@mui/material";

import FilmCard from "../../components/film-card";

const FilmDisplay = ({ headLine, films }) => {
    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4">{headLine}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", width: "5000px" }}>
                {
                    films?.results
                        ? (
                            films?.results.map(film => (
                                <FilmCard film={film} />
                            ))
                        )
                        : null
                }
            </Box>
        </Box>
    )
}

const Home = () => {
    const { nowPlaying, popularFilms, topRatedFilms, upcomingFilms } = useContext(TmdbContext)

    return (
        <Box sx={{ padding: "20px" }}>
            <FilmDisplay headLine={"Films Now Playing"} films={nowPlaying} />
            <FilmDisplay headLine={"Popular Films"} films={popularFilms} />
            <FilmDisplay headLine={"Highest Rated Films"} films={topRatedFilms} />
            <FilmDisplay headLine={"Upcoming Films"} films={upcomingFilms} />
        </Box>
    )
}

export default Home;