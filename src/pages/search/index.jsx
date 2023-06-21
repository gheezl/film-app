import { useContext } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import FullPageDisplay from "../../components/film-set-display-full-page";

const Search = () => {
    const { searchedFilms } = useContext(TmdbContext);

    return (
        <FullPageDisplay headLine={searchedFilms.films[0] ? `Results for ${searchedFilms.headLine}` : `There are no results for ${searchedFilms.headLine}`} films={searchedFilms.films} />
    )
}

export default Search;