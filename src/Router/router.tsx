import {createBrowserRouter} from "react-router-dom"
import { DashBoard } from "../Views/Dashboard"
import { DoubleGaugeDemo } from "../Views/Demoes/DoubleGaugeDemo"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashBoard />
    },
    {
        path: "/double-gauge-demo",
        element: <DoubleGaugeDemo />
    }
])

