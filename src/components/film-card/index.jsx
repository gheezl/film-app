import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

import { Link } from "react-router-dom";

import { useSpring, animated } from '@react-spring/web'

const FilmCard = ({ film }) => {
    const [isHovered, setIsHovered] = useState(false);

    const fadeAnimation = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 750 },
    })

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Tooltip
                title={
                    <Typography
                        variant="h4"
                        sx={{
                            margin: "5px"
                        }}
                    >
                        {film.title}
                    </Typography>
                }
            >
                <Link to={`/film/${film.id}`} >
                    <animated.div style={{ ...fadeAnimation }} >
                        <Paper
                            elevation={isHovered ? 0 : 1}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            sx={{
                                margin: "20px 10px 20px 10px",
                                cursor: isHovered ? "pointer" : null,
                            }}
                        >
                            <img alt="alt" style={{ height: "296px", borderRadius: "25px" }} src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`} />
                        </Paper>
                    </animated.div>
                </Link >
            </Tooltip>
        </Box>
    )
}

export default FilmCard;