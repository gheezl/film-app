import { useContext, useState, useEffect } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { getRecommendedFilms } from "../../utilities/utilities";
import FullPageDisplay from "../../components/film-set-display-full-page";

const Recommendations = () => {
    const [recommended, setRecommended] = useState();
    const { recentlyViewed } = useContext(TmdbContext);

    useEffect(() => {
        setRecommended(getRecommendedFilms(recentlyViewed))
    }, [recentlyViewed])

    return (
        <>
            {
                recommended
                    ? <FullPageDisplay headLine="Recommended Films" films={recommended} />
                    : null
            }
        </>
    )
}

export default Recommendations;