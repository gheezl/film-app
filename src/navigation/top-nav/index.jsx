import { Box, Typography } from "@mui/material";

import style from "./style";

const Header = () => {
    return (
        <Box
            sx={style.topNavBorder}
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