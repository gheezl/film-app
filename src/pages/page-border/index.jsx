import { useContext } from "react"
import { Box, useTheme, useMediaQuery } from "@mui/material"
import { StylingContext } from "../../contexts/StylingProvider"
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
                backgroundColor: theme.palette ? theme.palette.background.main : null
            }}
        >
            {
                isBelowMd
                    ? <BottomNav />
                    : <SideNav />
            }
            {children}
        </Box>
    )
}

export default PageBorder;