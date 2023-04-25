import { SxProps } from "@mui/material";
import { IGaugeTextProps } from "./lib/IGaugeTextProps";
import { IGaugeValues } from "./lib/IGaugeValues";
import { CanvasDrawFunction } from "./lib/canvasTypes";
import { CanvasBase } from "./CanvasBase";
import { IGaugeDimension } from "./lib/IGaugeDimension";
import { IGaugeProps } from "./lib/IGaugeProps";
import { drawAltGauge_2, drawAltGauge_3 } from "./lib/drawAltGauge";

interface IProps {
    textProps: IGaugeTextProps;
    mainValues: IGaugeValues;
    subValues: IGaugeValues;
    sx?: SxProps
}

export const AltGauge_3 = ({textProps, mainValues, subValues, sx}: IProps) => {

    const draw: CanvasDrawFunction = (ctx, height, width) => {

        const center_x = width / 2;
        const center_y = textProps.includeHeader ? (height * 0.85 / 1.75) + (height * 0.15) : height / 1.75;

        const baseRadius = (center_x < center_y ? center_x : center_y)
        const outer_radius = textProps.includeHeader ? baseRadius * 0.75 : baseRadius * 0.98
        const inner_radius = outer_radius / 2;
        const handRadius = outer_radius / 10;

        const dimensions: IGaugeDimension = {
            height,
            width,
            center_x,
            center_y,
            outer_radius,
            inner_radius,
            handRadius,
        }


        const props: IGaugeProps = {
            textProps,
            dimensions,
            values: mainValues,
            subValues,
        }

        drawAltGauge_3(ctx, props);
    }

    

    return <CanvasBase draw={draw} sx={sx} />

}