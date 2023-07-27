import { Box, useTheme, useMediaQuery } from "@mui/material"
import BottomNav from "../../navigation/bottom-nav";
import SideNav from "../../navigation/side-nav";

import style from "./style";

const PageBorder = ({ children }) => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={style.border} >
            {
                isBelowMd
                    ? <BottomNav />
                    : <SideNav />
            }
            <Box
                sx={style.childrenBorder}
            >
                {children}
            </Box>
        </Box>
    )
}

export default PageBorder;