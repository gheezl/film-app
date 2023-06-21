import { useContext } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box } from "@mui/material";

import FilmSetDisplay from "../../components/film-set-display";
import style from "./styles";

const Home = () => {
    const { nowPlaying, popularFilms, topRatedFilms, upcomingFilms, trendingFilms } = useContext(TmdbContext)

    return (
        <Box sx={style.pageBorder}>
            <FilmSetDisplay headLine={"Films Now Playing"} films={nowPlaying} />
            <FilmSetDisplay headLine={"Popular Films"} films={popularFilms} />
            <FilmSetDisplay headLine={"Trending Films"} films={trendingFilms} />
            <FilmSetDisplay headLine={"Highest Rated Films"} films={topRatedFilms} />
            <FilmSetDisplay headLine={"Upcoming Films"} films={upcomingFilms} />
        </Box>
    )
}

export default Home;