import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmsByGenre } from "../../services/TmdbServices";
import FullPageDisplay from "../../components/film-set-display-full-page";
import Loader from "../../components/loader";

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

        return () => {
            mounted = false;
            setFilms(null);
        }
    }, [id])


    if (films) {
        return <FullPageDisplay headLine={`Results for ${name}`} films={films} />
    }
    else {
        return <Loader />
    }
}

export default Genre;