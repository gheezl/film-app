import { Box, Typography, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
    const theme = useTheme();
    const angle = progress * 360;

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
            <Typography
                sx={{
                    marginTop: "110px",
                    marginLeft: "100px"
                }}
            >
                YOOOO
            </Typography>
        </Box>
    )
}

export default ProgressCircle;