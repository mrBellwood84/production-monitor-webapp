import { Fragment } from "react"
import {createBrowserRouter} from "react-router-dom"
import { DashBoard } from "../Views/Dashboard"
import { DoubleGaugeDemo } from "../Views/Demoes/DoubleGaugeDemo"
import { GarmentHangupDemo } from "../Views/Demoes/GarmentHangupDemo"
import { GarmentSignalRConnection } from "../Views/PseudoComponents/GarmentSignalRConnection"
import { GarmentDataLoader } from "../Views/PseudoComponents/GarmentDataLoader"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashBoard />
    },
    {
        path: "/double-gauge-demo",
        element: <DoubleGaugeDemo />
    },
    {
        path: "/garment-hangup-demo",
        element: (
            <Fragment>
                <GarmentDataLoader />
                <GarmentSignalRConnection />
                <GarmentHangupDemo />
            </Fragment>
        )
    }
])

