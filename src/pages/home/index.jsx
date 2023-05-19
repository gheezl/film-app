import { useContext } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box } from "@mui/material";

import FilmSetDisplay from "../../components/film-set-display";

const Home = () => {
    const { nowPlaying, popularFilms, topRatedFilms, upcomingFilms } = useContext(TmdbContext)

    return (
        <Box sx={{ padding: "20px", marginBottom: "20px" }}>
            <FilmSetDisplay headLine={"Films Now Playing"} films={nowPlaying} />
            <FilmSetDisplay headLine={"Popular Films"} films={popularFilms} />
            <FilmSetDisplay headLine={"Highest Rated Films"} films={topRatedFilms} />
            <FilmSetDisplay headLine={"Upcoming Films"} films={upcomingFilms} />
        </Box>
    )
}

export default Home;