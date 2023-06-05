import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmsByGenre } from "../../services/TmdbServices";
import FullPageDisplay from "../../components/film-set-display-full-page";

const Genre = () => {
    const [films, setFilms] = useState();
    const { name } = useParams();

    useEffect(() => {
        let mounted = true;

        const getFilms = async () => {
            console.log(name);
            const films = await getFilmsByGenre(name)
            console.log(films);
            if (mounted) {
                setFilms(films.results)
            }
        }

        getFilms();
    }, [name])

    useEffect(() => {
        console.log(films)
    }, [films])

    return (
        <>
            {
                films
                    ? <FullPageDisplay headLine={`Results for ${name}`} films={films} />
                    : null
            }
        </>
    )
}

export default Genre;