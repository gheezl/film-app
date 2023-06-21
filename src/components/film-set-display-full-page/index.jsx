import { Typography, Box, Grid } from "@mui/material";
import FilmCard from "../film-card";
import InfoTooltip from "../info-tooltip";

import style from "./style";

const FullPageDisplay = ({ headLine, alternateHeadline, films, showInfo, }) => {
    return (
        <Box sx={style.displayBorder}>
            <Box sx={style.headLineBorder}>
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
                style={style.gridBorder}
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