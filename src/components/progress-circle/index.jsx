import { Box, Typography, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", votes, size = "40" }) => {
    const theme = useTheme();
    const angle = (progress * 0.1) * 360;

    return (
        <Box sx={{
            background: `radial-gradient(${theme.palette.background.default} 55%, transparent 56%),
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
                <Typography
                    variant="h2"
                >
                    {progress} / 10
                </Typography>
                <Typography
                    variant="h5"
                >
                    {votes} votes
                </Typography>

            </Box>


        </Box>
    )
}

export default ProgressCircle;