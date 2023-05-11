import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { useState } from "react"

import { gaugeRoutes, demoRoutes } from "../_router/routeProvider"
import { LinkListBox } from "./LinkListBox"

export const DashBoard = () => {

    const [apiMessage, setApiMessage] = useState<string>("");


    const testApiConnection = async () => {
        try {
            const result = await fetch("https://localhost:7031/api/alive");
            if (result.ok) {
                const str = `${result.status} ${result.statusText} - ${await result.text()}`
                setApiMessage(str);
            }
            else {
                const str = `${result.status} ${result.statusText}\n - No Api Connection`
                setApiMessage(str);
            }
        } catch (ex) {
            const str = `${ex}, No Api Connection`
            setApiMessage(str);
        }
    }   

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
                <LinkListBox list={gaugeRoutes} title="Demo Målere" />
                <LinkListBox list={demoRoutes} title="Demo Produksjon"/>
            </Stack>

            <Box sx={{display: "flex", justifyContent: "center", alignItems: "baseline", mt: 5}}>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Button type="button" variant="contained" onClick={testApiConnection}>Test RestAPI connection</Button>
                    <Typography variant="caption" fontSize={18} color="#333" fontWeight="bold">
                        {apiMessage}
                    </Typography>
                </Stack>
            </Box>

        </Box>
    )
}