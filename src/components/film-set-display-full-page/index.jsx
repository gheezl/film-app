import { Typography, Box, useTheme } from "@mui/material";
import FilmCard from "../film-card";
import { useEffect } from "react";

const FullPageDisplay = ({ headLine, films }) => {
    const theme = useTheme()

    useEffect(() => {
        console.log("outcome", films);
    }, [films])

    return (
        <Box sx={{ padding: "20px", height: "417px" }}>
            <Typography
                variant="h3"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2px 0px 10px 0px",
                }}
            >
                {headLine}
            </Typography>
            <Box
                style={{
                    // borderLeft: `1px solid ${theme.palette.primary.secondary}`,
                    // borderRight: `1px solid ${theme.palette.primary.secondary}`,
                    // borderRadius: "20px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "50px",
                    marginTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px"
                }}
            >
                {
                    films
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