import { InfoOutlined } from "@mui/icons-material";
import { Tooltip, Typography, useTheme } from "@mui/material";

const InfoTooltip = ({ text }) => {
    const theme = useTheme();

    return (
        <Tooltip
            title={
                <Typography
                    variant="h4"
                    sx={{
                        margin: "5px"
                    }}
                >
                    {text}
                </Typography>
            }

            arrow
        >
            <InfoOutlined
                style={{
                    color: theme.palette.primary.main,
                    fontSize: "25px"
                }}
            />
        </Tooltip>
    )
}

export default InfoTooltip;