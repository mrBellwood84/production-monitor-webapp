import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { ILinkItem } from "../models/ILinkItem"

interface IProps {
    list: ILinkItem[]
}

export const LinkListBox = ({list}: IProps) => {
    return (
        <Box sx={{
            width: "100%",
            maxWidth: 300,
            border: "1px solid #999",
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            
            
            }}>

            <Typography variant="h6" component="div" sx={{color: "#333"}}>
                Målere
            </Typography>

            <List sx={{width: "100%"}}>
                {list.map(item => (
                    <ListItem  key={item.uri} disablePadding>
                        <ListItemButton LinkComponent={Link} href={item.uri}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}