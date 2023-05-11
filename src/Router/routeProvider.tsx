import { RouteObject } from "react-router-dom";
import { DashBoard } from "../views/Dashboard";
import { ProductionDemo } from "../views/demoes/ProductionDemo";
import { GaugeDemo } from "../views/demoes/GaugeDemo";

export interface CustomRouteObject {
    path: string;
    element: JSX.Element;
    label: string,
}

export const gaugeRoutes: CustomRouteObject[] = [
    {
        path: "singleGaugeDemo",
        element: <GaugeDemo gaugeType="single" title="Enkel Måler" />,
        label: "Enkel Måler",
    },
    {
        path: "doublegaugev1",
        element: <GaugeDemo gaugeType="v1" title="Dobbel Måler, Type 1" />,
        label: "Dobbel Måler, Type 1"
    },
    {
        path: "doublegaugev2",
        element: <GaugeDemo gaugeType="v2" title="Dobbel Måler Type 2" />,
        label: "Dobbel Måler, Type 2"
    },
    {
        path: "altgauge-1",
        element: <GaugeDemo gaugeType="alt1" title="Alternativ Måler 1" />,
        label: "Alternativ Måler 1",
    },
    {
        path: "altgauge-2",
        element: <GaugeDemo gaugeType="alt2" title="Alternativ Måler 2" />,
        label: "Alternativ Måler 2",
    },
    {
        path: "altgauge-3",
        element: <GaugeDemo gaugeType="alt3" title="Alternativ Måler 3" />,
        label: "Alternativ Måler 3",
    }

]

export const demoRoutes: CustomRouteObject[] = [
    {
        path: "singlegauge-productiondemo",
        element: <ProductionDemo type="single"/>,
        label: "Enkel måler, Type 1"
    },    {
        path: "doublegaugev1-productiondemo",
        element: <ProductionDemo type="v1"/>,
        label: "Dobbel Måler, Type 1",
    },    {
        path: "doublegaugev2-productiondemo",
        element: <ProductionDemo type="v2"/>,
        label: "Dobbel Måler, Type 2",
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