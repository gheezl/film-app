import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmsByGenre } from "../../services/TmdbServices";
import FullPageDisplay from "../../components/film-set-display-full-page";

const Genre = () => {
    const [films, setFilms] = useState();
    const { name, id } = useParams();

    useEffect(() => {
        let mounted = true;

        const getFilms = async () => {
            console.log(name, id);
            const films = await getFilmsByGenre(id);
            console.log(films);
            if (mounted) {
                setFilms(films.results);
            }
        }

        getFilms();
    }, [id])

    useEffect(() => {
        console.log(films);
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