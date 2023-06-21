import { Box, Typography, useTheme } from "@mui/material";

import style from "./style";

const ProgressCircle = ({ progress, votes, size }) => {
    const theme = useTheme();
    const angle = (progress * 0.1) * 360;

    return (
        <Box sx={style.progressCircleBorder}>
            <Box sx={
                style.progressCircleCompleted(theme.palette.primary.main, theme.palette.secondary.main, theme.palette.background.main, angle, size)
            }
            >
                <Box
                    sx={{
                        width: `${size}px`,
                        height: `${size}px`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {
                        votes
                            ?
                            <>
                                <Typography
                                    variant="h2"
                                >
                                    {progress % 1 === 0 ? progress : progress.toFixed(1)} / 10
                                </Typography>
                                <Typography
                                    variant="h5"
                                >
                                    {votes.toLocaleString()} reviews
                                </Typography>
                            </>
                            :
                            <Typography
                                variant="h3"
                            >
                                No reviews
                            </Typography>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default ProgressCircle;