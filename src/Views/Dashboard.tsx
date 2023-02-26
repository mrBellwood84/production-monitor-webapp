import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import { ILinkItem } from "../models/ILinkItem"
import { LinkListBox } from "./LinkListBox"

const gaugeLinks: ILinkItem[] = [
    {
        name: "Dobbel Gauge Demo",
        uri: "double-gauge-demo",
    }
]

export const DashBoard = () => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Produksjon Demo
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{mt:1}}>
                <LinkListBox list={gaugeLinks} />
            </Container>

        </Box>
    )
}