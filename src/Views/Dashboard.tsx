import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { ILinkItem } from "../Models/ILinkItem"
import { LinkListBox } from "./LinkListBox"

const gaugeLinks: ILinkItem[] = [
    {
        name: "Dobbel Gauge Demo",
        uri: "double-gauge-demo",
    },

]

const screenLinks: ILinkItem[] = [
    {
        name: "Oppheng Produksjon Skjerm",
        uri: "garment-hangup-demo"
    },
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

            <Stack direction="row" spacing={2} sx={{mt: 2}} justifyContent="center">
                <LinkListBox list={gaugeLinks} title="Målere" />
                <LinkListBox list={screenLinks} title="Oversikt Produksjon"/>
            </Stack>

        </Box>
    )
}