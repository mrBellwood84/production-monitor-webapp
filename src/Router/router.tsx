import {createBrowserRouter} from "react-router-dom"
import { DashBoard } from "../Views/Dashboard"
import { DoubleGaugeDemo } from "../Views/Demoes/DoubleGaugeDemo"
import { GarmentHangupDemo } from "../Views/Demoes/GarmentHangupDemo"

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
        element: <GarmentHangupDemo />
    }
])

