import { Box } from '@mui/material';
import { CircleLoader } from 'react-spinners';
import { useTheme } from "@mui/material";
import styles from './style';

const Loader = () => {
    const theme = useTheme();

    return (
        <Box sx={styles.loaderBorder(theme.palette.background.main)}>
            <CircleLoader color="#00bcd4" size={150} />
        </Box>
    )
}

export default Loader;