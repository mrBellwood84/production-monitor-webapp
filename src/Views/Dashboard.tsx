import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { useEffect, useRef, useState } from "react"
import { LinkListBox } from "./LinkListBox"

import { HubConnectionBuilder, HubConnectionState, HubConnection, HttpTransportType } from "@microsoft/signalr"
import { gaugeRoutes, provideDemoRoutes, provideGaugeRoutes } from "../Router/routeProvider"

export const DashBoard = () => {

    const connected = useRef<boolean>(false);
    const [apiMessage, setApiMessage] = useState<string>("");

    // signalR test
    useEffect(() => {
        const establishConnection = () => {
            if (connected.current) return;
            let c = new HubConnectionBuilder()
                .withUrl("https://localhost:7031/hub", {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets,
                })
                .withAutomaticReconnect()
                .build();
            connected.current = true;
            c.on("sayHelloMessage", message => console.log(message));
            c.start()
        }
        establishConnection();

    },[])

    const testApiConnection = async () => {
        const result = await fetch("https://localhost:7031/api/alive");
        if (result.ok) {
            const str = `${result.status} ${result.statusText} - ${await result.text()}`
            setApiMessage(str);
        }
        else {
            const str = `${result.status} ${result.statusText}\n - No Api Connection`
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
                <LinkListBox list={[]} title="Demo Produksjon"/>
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