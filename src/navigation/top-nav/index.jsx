import { Box, Typography, useTheme } from "@mui/material"

const Header = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                borderBottom: `1px solid ${theme.palette.background.second}`,
                margin: "10px"
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "15px"
                }}
            >
                Film App
            </Typography>
        </Box>
    )
}

export default Header;