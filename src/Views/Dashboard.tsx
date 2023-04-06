import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { useEffect, useRef, useState } from "react"
import { ILinkItem } from "../Models/ILinkItem"
import { LinkListBox } from "./LinkListBox"

import { HubConnectionBuilder, HubConnectionState, HubConnection, HttpTransportType } from "@microsoft/signalr"

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

    const connected = useRef<boolean>(false);

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

    const sendMessage = async () => {
        const result = await fetch("https://localhost:7031/api/alive");
        if (result.ok) {
            console.log(result.status, await result.text());
        }
        else {
            console.log(result.status, result.statusText)
            console.log("no contact with api")
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
                <LinkListBox list={gaugeLinks} title="Målere" />
                <LinkListBox list={screenLinks} title="Oversikt Produksjon"/>
            </Stack>

            <Button color="secondary" onClick={sendMessage}>Test</Button>

        </Box>
    )
}