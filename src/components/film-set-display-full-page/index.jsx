import { Typography, Box, useTheme } from "@mui/material";
import FilmCard from "../film-card";
import { useEffect } from "react";
import InfoTooltip from "../info-tooltip";

const FullPageDisplay = ({ headLine, alternateHeadline, films, showInfo }) => {
    const theme = useTheme();

    return (
        <Box sx={{ padding: "20px", }}>
            <Box
                sx={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}
            >
                <Typography variant="h2" >{films[0] ? headLine : alternateHeadline}</Typography>
                <InfoTooltip text="We determine which films to recommend to you by observing your recently viewed films and determining which genres you view the most. We then recommend films that are of those same genres." />
            </Box>
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