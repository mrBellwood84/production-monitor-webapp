import { RouteObject } from "react-router-dom";
import { SingleGaugeDemo } from "../Views/Demoes/SingleGaugeDemo";
import { DoubleGaugeV1_SubtargetDemo } from "../Views/Demoes/DoubleGaugeV1_SubtargetDemo";
import { DoubleGaugeV1_SpeedDemo } from "../Views/Demoes/DoubleGaugeV1_SpeedDemo";
import { DoubleGaugeV2_SubtargetDemo } from "../Views/Demoes/DoubleGaugeV2_SubtargetDemo";
import { DoubleGaugeV2_SpeedDemo } from "../Views/Demoes/DoubleGaugeV2_SpeedDemo";
import { DashBoard } from "../Views/Dashboard";

export interface CustomRouteObject {
    path: string;
    element: JSX.Element;
    label: string,
}

export const gaugeRoutes: CustomRouteObject[] = [
    {
        path: "singleGaugeDemo",
        element: <SingleGaugeDemo />,
        label: "Single Gauge Demo",
    },
    {
        path: "doublegaugev1/subtargetdemo",
        element: <DoubleGaugeV1_SubtargetDemo />,
        label: "Double Gauge v.1, Delmål Demo"
    },
    {
        path: "doublegaugev1/speeddemo",
        element: <DoubleGaugeV1_SpeedDemo />,
        label: "Double Gauge v.1, Hastighet Demo"
    },
    {
        path: "doublegaugev2/subtargetdemo",
        element: <DoubleGaugeV2_SubtargetDemo />,
        label: "Double Gaugle v.2, Delmål Demo "
    },
    {
        path: "doublegaugev2/speeddemo",
        element: <DoubleGaugeV2_SpeedDemo />,
        label: "Double Gauge v.2, Delmål Demo"
    }
]


export const provideGaugeRoutes = () => {
    const routes = gaugeRoutes.map(x =>  { return { path: `/${x.path}`, element: x.element }});
    return routes;
}

export const provideDemoRoutes = () => {
    return []
}

export const provideAllRoutes = () => {

    const routes: RouteObject[] = [
        {
            path: "/",
            element: <DashBoard />
        }
    ].concat(provideGaugeRoutes(),provideDemoRoutes())

    return routes;

}