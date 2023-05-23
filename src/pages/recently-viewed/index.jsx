import { useContext } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Typography, Box } from "@mui/material";
import FullPageDisplay from "../../components/film-set-display-full-page";

const RecentlyViewed = () => {
    const { recentlyViewed } = useContext(TmdbContext)

    return (
        <FullPageDisplay headLine="Recently Viewed" films={recentlyViewed} />
    )
}

export default RecentlyViewed;