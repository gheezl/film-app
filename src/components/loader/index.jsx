import { Box } from '@mui/material';
import { CircleLoader } from 'react-spinners';

const Loader = () => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#121212"
            }}
        >
            <CircleLoader color="#00bcd4" size={150} />
        </Box>
    )
}

export default Loader;