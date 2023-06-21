import { Box, Typography, useTheme } from "@mui/material";

import style from "./style";

const Header = () => {
    const theme = useTheme();

    return (
        <Box
            sx={style.border(theme.palette.background.second)}
        >
            <Typography
                variant="h1"
                sx={style.textBorder}
            >
                Film App
            </Typography>
        </Box>
    )
}

export default Header;