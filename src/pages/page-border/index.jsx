import { Box, useTheme, useMediaQuery } from "@mui/material"
import BottomNav from "../../navigation/bottom-nav";
import SideNav from "../../navigation/side-nav";

const PageBorder = ({ children }) => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "row",
                height: "100vh",
                backgroundColor: theme.palette ? theme.palette.background.main : null,
            }}
        >
            {
                isBelowMd
                    ? <BottomNav />
                    : <SideNav />
            }
            <Box
                sx={{
                    width: "100%",
                    overflow: "scroll",
                    paddingBottom: "40px"
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default PageBorder;