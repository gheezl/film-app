import { useContext } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Typography, Box, Button } from "@mui/material";
import FullPageDisplay from "../../components/film-set-display-full-page";

const RecentlyViewed = () => {
    const { recentlyViewed, removeRecentlyViewed } = useContext(TmdbContext)

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            <Button sx={{ margin: "20px" }} onClick={() => removeRecentlyViewed()} >Remove Recently Viewed</Button>
            <FullPageDisplay
                headLine={recentlyViewed[0] ? "Recently Viewed" : "There are no films to display"}
                films={recentlyViewed}
            />
        </Box>
    )
}

export default RecentlyViewed;