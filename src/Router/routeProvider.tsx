import { RouteObject } from "react-router-dom";
import { SingleGaugeDemo } from "../Views/Demoes/SingleGaugeDemo";
import { DashBoard } from "../Views/Dashboard";
import { ProductionDemo } from "../Views/Demoes/ProductionDemo";
import { DoubleGauge_Demo } from "../Views/Demoes/DoubleGauge_Demo";

export interface CustomRouteObject {
    path: string;
    element: JSX.Element;
    label: string,
}

export const gaugeRoutes: CustomRouteObject[] = [
    {
        path: "singleGaugeDemo",
        element: <SingleGaugeDemo />,
        label: "Enkel Måler",
    },
    {
        path: "doublegaugev1",
        element: <DoubleGauge_Demo gaugeType="V1" title="Måler, Type 1" />,
        label: "Dobbel måler, Type 1"
    },
    {
        path: "doublegaugev2",
        element: <DoubleGauge_Demo gaugeType="V2" title="Måler Type 2" />,
        label: "Dobbel måler, Type 2"
    },

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