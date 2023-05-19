import { Box, Typography, useTheme } from "@mui/material";

import FilmCard from "../../components/film-card";

import HorizontalScroll from "react-scroll-horizontal";

const FilmSetDisplay = ({ headLine, films }) => {
    const theme = useTheme()

    return (
        <Box sx={{ padding: "20px", height: "417px" }}>
            <Typography variant="h4">{headLine}</Typography>
            <HorizontalScroll
                style={{
                    borderLeft: `1px solid ${theme.palette.primary.secondary}`,
                    borderRight: `1px solid ${theme.palette.primary.secondary}`,
                    borderRadius: "20px",
                    marginTop: "10px",
                }}
            >
                {
                    films?.results
                        ? (
                            films?.results.map(film => (
                                <FilmCard film={film} />
                            ))
                        )
                        : null
                }
            </HorizontalScroll>
        </Box>
    )
}

export default FilmSetDisplay;