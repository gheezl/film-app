import { useContext, useEffect } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";

const Home = () => {
    const { nowPlaying, popularFilms, topRatedFilms, upcomingFilms } = useContext(TmdbContext)

    useEffect(() => {
        console.log("this is now playing", nowPlaying)
    }, [nowPlaying])

    useEffect(() => {
        console.log("this is popular", popularFilms)
    }, [popularFilms])

    useEffect(() => {
        console.log("this is topRated", topRatedFilms)
    }, [topRatedFilms])

    useEffect(() => {
        console.log("this is upcoming", upcomingFilms)
    }, [upcomingFilms])

    return (
        <div>
            <h1>This is the home page</h1>
        </div>
    )
}

export default Home;