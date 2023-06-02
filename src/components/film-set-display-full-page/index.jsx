import { Typography, Box, useTheme } from "@mui/material";
import FilmCard from "../film-card";
import { useEffect } from "react";

const FullPageDisplay = ({ headLine, films }) => {
    const theme = useTheme()

    return (
        <Box sx={{ padding: "20px", }}>
            <Typography
                variant="h2"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2px 0px 10px 0px",
                }}
            >
                {films[0] ? headLine : "No Similar Films"}
            </Typography>
            <Box
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "50px",
                    marginTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                }}
            >
                {
                    films[0]
                        ? (
                            films?.map(film => (
                                film.poster_path
                                    ? <FilmCard film={film} />
                                    : null
                            ))
                        )
                        : null
                }
            </Box>
        </Box>
    )
}

export default FullPageDisplay;