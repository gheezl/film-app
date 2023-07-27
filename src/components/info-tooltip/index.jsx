import { InfoOutlined } from "@mui/icons-material";
import { Tooltip, Typography, useTheme } from "@mui/material";

import styles from "./styles";

const InfoTooltip = ({ text }) => {
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
            <InfoOutlined sx={styles.infoIcon} />
        </Tooltip>
    )
}

export default InfoTooltip;