import {createBrowserRouter} from "react-router-dom"
import { DashBoard } from "../Views/Dashboard"
import { GaugeDemo } from "../Views/Demos/GaugeDemo"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashBoard />
    },
    {
        path: "gauge-1-demo",
        element: <GaugeDemo />
    }
])

