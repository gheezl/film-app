import { Typography, Box, Grid } from "@mui/material";
import FilmCard from "../film-card";
import InfoTooltip from "../info-tooltip";

const FullPageDisplay = ({ headLine, alternateHeadline, films, showInfo, }) => {
    return (
        <Box sx={{ padding: "20px", }}>
            <Box
                sx={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}
            >
                <Typography variant="h2" >{films[0] ? headLine : alternateHeadline}</Typography>
                {
                    showInfo
                        ? < InfoTooltip text="We determine which films to recommend to you by observing your recently viewed films and determining which genres you view the most. We then recommend films that are of those same genres." />
                        : null
                }
            </Box>
            <Grid
                container
                spacing={2}
                marginTop="10px"
                paddingLeft="10px"
                paddingRight="10px"
            >
                {films[0]
                    ?
                    films.map(film => (
                        film.poster_path && (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                <FilmCard film={film} />
                            </Grid>
                        )
                    ))
                    : null
                }
            </Grid>
        </Box>
    )
}

export default FullPageDisplay;