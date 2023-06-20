import { Box } from '@mui/material';
import { CircleLoader } from 'react-spinners';
import { useTheme } from "@mui/material";


const Loader = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.background.main ? theme.palette.background.main : "#121212"
            }}
        >
            <CircleLoader color="#00bcd4" size={150} />
        </Box>
    )
}

export default Loader;