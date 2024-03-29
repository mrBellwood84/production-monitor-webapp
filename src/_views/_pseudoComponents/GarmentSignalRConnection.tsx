import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr"
import { useEffect, useRef } from "react"
import { useAppDispatch } from "../../_store/hooks";
import { IProductionUpdateDTO } from "../../_models/_production/IProductionUpdateDTO";
import { productionSlice } from "../../_store/_slices/productionSlice";

export const GarmentSignalRConnection = () => {

    const connected = useRef<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const establishConnection = () => {
            if (connected.current) return
            try {

                let connection = new HubConnectionBuilder()
                    .withUrl("https://localhost:7031/hub", {
                        skipNegotiation: true,
                        transport: HttpTransportType.WebSockets
                    })
                    .withAutomaticReconnect()
                    .build();
                connection.on("UpdateProductionValue", (message: IProductionUpdateDTO) => {
                    dispatch(productionSlice.actions.incrementCounter(message))
                });
                connection.start();
                dispatch(productionSlice.actions.setSocketConnected(true));
                connected.current = true;
            } catch (ex) {
                console.error("Could not connect to SignalR WebSocket")
            }
        }

        establishConnection();
    })

    return null
}