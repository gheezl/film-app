import { useTheme, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const ItemList = ({ items, headLine }) => {
    const theme = useTheme();

    return (
        <Box
        // sx={{
        //     width: "100%"
        // }}
        >
            <Typography variant="h2">{headLine}</Typography>
            <List>
                {
                    items && items[0]
                        ? items.map(item => (
                            <ListItem
                                sx={{
                                    padding: "5px 0px 5px 10px"
                                }}
                            >
                                <ListItemIcon>
                                    <span
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            backgroundColor: theme.palette.primary.secondary,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        margin: "0px 0px 0px -35px",
                                    }}
                                    primary={item.name}
                                />
                            </ListItem>
                        ))
                        : <Typography sx={{ color: theme.palette.primary.third }} variant="h4">No data.</Typography>
                }
                {/* {
                    items[0]

                } */}
            </List>
        </Box>
    )
}

export default ItemList;