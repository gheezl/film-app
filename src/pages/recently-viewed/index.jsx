import { useContext } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Typography, Box } from "@mui/material";

const RecentlyViewed = () => {
    const { recentlyViewed } = useContext(TmdbContext)

    return (
        <Box>
            {
                recentlyViewed.map(film => (
                    <Typography>{film.title}</Typography>
                ))
            }
        </Box>
    )
}

export default RecentlyViewed;