import { useContext } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, Typography } from "@mui/material";

const Film = () => {
    const { selectedFilm } = useContext(TmdbContext);

    return (
        <Box>
            <Typography>{selectedFilm.title}</Typography>
        </Box>
    )
}

export default Film;