import {createBrowserRouter} from "react-router-dom"
import { App } from "../App"
import { DashBoard } from "../Views/Dashboard"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashBoard />
    },
    {
        path: "gauge-1-demo",
        element: <App />
    }
])

