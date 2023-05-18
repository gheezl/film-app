import { Box, Typography } from "@mui/material";

import FilmCard from "../../components/film-card";

const FilmSetDisplay = ({ headLine, films }) => {
    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4">{headLine}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", width: "5000px" }}>
                {
                    films?.results
                        ? (
                            films?.results.map(film => (
                                <FilmCard film={film} />
                            ))
                        )
                        : null
                }
            </Box>
        </Box>
    )
}

export default FilmSetDisplay;