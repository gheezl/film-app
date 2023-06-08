import { Box, Typography, useTheme } from "@mui/material";

const ProgressCircle = ({ progress, votes, size }) => {
    const theme = useTheme();
    const angle = (progress * 0.1) * 360;

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Box sx={{
                background: `radial-gradient(${theme.palette.background.main} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${theme.palette.secondary.main} ${angle}deg 360deg),
                ${theme.palette.primary.main}`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
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