import { useTheme, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import styles from "./style";

const ItemList = ({ items, headLine }) => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h2">{headLine}</Typography>
            <List>
                {
                    items && items[0]
                        ? items.map(item => (
                            <ListItem sx={styles.listItem}>
                                <ListItemIcon>
                                    <Typography sx={styles.listItemIcon} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={styles.listItemText}
                                    primary={item.name}
                                />
                            </ListItem>
                        ))
                        : <Typography sx={styles.noData} variant="h4">No data.</Typography>
                }
            </List>
        </Box>
    )
}

export default ItemList;