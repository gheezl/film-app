import { useContext, useState, useEffect } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { getRecommendedFilms } from "../../utilities/utilities";
import FullPageDisplay from "../../components/film-set-display-full-page";

const Recommendations = () => {
    const [recommended, setRecommended] = useState();
    const { recentlyViewed } = useContext(TmdbContext);

    useEffect(() => {
        const findRecommended = async () => {
            setRecommended(await getRecommendedFilms(recentlyViewed))
        }

        findRecommended();
    }, [recentlyViewed])

    return (
        <>
            {
                recommended
                    ? <FullPageDisplay headLine="Recommended Films" alternateHeadline="No Recommended Films" films={recommended} showInfo={true} />
                    : null
            }
        </>
    )
}

export default Recommendations;