import { useContext, useEffect } from "react";
import { TmdbContext } from "../../contexts/TmdbProvider";
import { Box, Paper, Typography } from "@mui/material";

const Film = () => {
    const { selectedFilm } = useContext(TmdbContext);

    useEffect(() => {
        console.log(selectedFilm)
    }, [selectedFilm])

    return (
        <Box sx={{ padding: "20px", marginBottom: "20px" }}>
            <Typography>{selectedFilm.title}</Typography>
            {/* this will show the image */}
            {/* <Paper elevation={1}> */}
            <img style={{ width: "400px", borderRadius: "25px" }} src={`https://image.tmdb.org/t/p/w1280${selectedFilm.poster_path}`} />
            {/* </Paper> */}
        </Box>
    )
}

export default Film;