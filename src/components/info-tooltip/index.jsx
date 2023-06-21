import { InfoOutlined } from "@mui/icons-material";
import { Tooltip, Typography, useTheme } from "@mui/material";

import styles from "./styles";

const InfoTooltip = ({ text }) => {
    const theme = useTheme();

    return (
        <Tooltip
            title={
                <Typography
                    variant="h4"
                    sx={styles.infoText}
                >
                    {text}
                </Typography>
            }
        >
            <InfoOutlined style={styles.infoIcon(theme.palette.primary.main)} />
        </Tooltip>
    )
}

export default InfoTooltip;