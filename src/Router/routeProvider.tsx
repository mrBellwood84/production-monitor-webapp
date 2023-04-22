import { RouteObject } from "react-router-dom";
import { SingleGaugeDemo } from "../Views/Demoes/SingleGaugeDemo";
import { DoubleGaugeV1_SubtargetDemo } from "../Views/Demoes/DoubleGaugeV1_SubtargetDemo";
import { DoubleGaugeV1_SpeedDemo } from "../Views/Demoes/DoubleGaugeV1_SpeedDemo";
import { DoubleGaugeV2_SubtargetDemo } from "../Views/Demoes/DoubleGaugeV2_SubtargetDemo";
import { DoubleGaugeV2_SpeedDemo } from "../Views/Demoes/DoubleGaugeV2_SpeedDemo";
import { DashBoard } from "../Views/Dashboard";
import { ProductionDemo } from "../Views/Demoes/ProductionDemo";

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

export const demoRoutes: CustomRouteObject[] = [
    {
        path: "singlegauge-productiondemo",
        element: <ProductionDemo type="single"/>,
        label: "Single Gauge"
    },    {
        path: "doublegaugev1-productiondemo",
        element: <ProductionDemo type="v1"/>,
        label: "Double V1 Gauge"
    },    {
        path: "doublegaugev2-productiondemo",
        element: <ProductionDemo type="v2"/>,
        label: "Double V2 Gauge"
    }
]


export const provideGaugeRoutes = (): RouteObject[] => {
    const routes = gaugeRoutes.map(x =>  { return { path: `/${x.path}`, element: x.element }});
    return routes;
}

export const provideDemoRoutes = (): RouteObject[] => {
    const routes = demoRoutes.map(x => { return { path: `/${x.path}`, element: x.element}});
    return routes;
}

export const provideAllRoutes = (): RouteObject[] => {

    const gaugeRoutes = provideGaugeRoutes();
    const demoRoutes = provideDemoRoutes();

    const routes: RouteObject[] = [
        {
            path: "/",
            element: <DashBoard />
        }
    ];

    gaugeRoutes.map(x => routes.push(x));
    demoRoutes.map(x => routes.push(x));

    return routes;
}