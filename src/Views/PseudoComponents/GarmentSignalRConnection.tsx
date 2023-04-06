import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr"
import { Fragment, useEffect, useRef } from "react"
import { useAppDispatch } from "../../Store/hooks";
import { IProductionUpdateDTO } from "../../Models/Production/IProductionUpdateDTO";
import { productionSlice } from "../../Store/Slices/productionSlice";

export const GarmentSignalRConnection = () => {

    const connected = useRef<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const establishConnection = () => {
            if (connected.current) return
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
            connected.current = true;
        }
        establishConnection();
    })

    return <Fragment />
}