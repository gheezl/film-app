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
            const films = await getFilmsByGenre(id);
            if (mounted) {
                setFilms(films.results);
            }
        }

        getFilms();
    }, [id])

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