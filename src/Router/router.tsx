import { createBrowserRouter} from "react-router-dom"
import { provideAllRoutes } from "./routeProvider"

export const router = createBrowserRouter(provideAllRoutes());

