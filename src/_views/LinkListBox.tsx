import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { CustomRouteObject } from "../_router/routeProvider";

interface IProps {
    title: string;
    list: CustomRouteObject[]
}

export const LinkListBox = ({list, title}: IProps) => {
    return (
        <Box sx={{
            width: "100%",
            maxWidth: 300,
            border: "1px solid #999",
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            alignItems: "center",
            
            
            }}>

            <Typography variant="h6" component="div" sx={{color: "#333"}}>
                {title}
            </Typography>

            <List sx={{width: "100%"}}>
                {list.map(item => (
                    <ListItem  key={item.path} disablePadding>
                        <ListItemButton LinkComponent={Link} href={item.path}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}