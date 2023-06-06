import { useContext } from "react"
import { Box } from "@mui/material"
import { StylingContext } from "../../contexts/StylingProvider"

const PageBorder = ({ children }) => {
    const { theme } = useContext(StylingContext)

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "row",
                height: "100vh",
                backgroundColor: theme.palette ? theme.palette.background.main : null
            }}
        >
            {children}
        </Box>
    )
}

export default PageBorder;