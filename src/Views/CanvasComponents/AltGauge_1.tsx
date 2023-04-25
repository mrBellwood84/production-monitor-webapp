import { SxProps, hexToRgb } from "@mui/material";
import { IGaugeTextProps } from "./lib/IGaugeTextProps";
import { IGaugeValues } from "./lib/IGaugeValues";
import { CanvasDrawFunction } from "./lib/canvasTypes";
import { IGaugeDimension } from "./lib/IGaugeDimension";
import { IGaugeProps } from "./lib/IGaugeProps";
import { drawAltGauge_1 } from "./lib/drawAltGauge";
import { CanvasBase } from "./CanvasBase";

interface IProps {
    textProps: IGaugeTextProps;
    values: IGaugeValues;
    sx?: SxProps
}

export const AltGauge_1 = ({textProps, values, sx}: IProps) => {

    const draw: CanvasDrawFunction = (ctx, height, width) => {

        const center_x = width / 2;
        const center_y = textProps.includeHeader ? (height * 0.85 / 2) + (height * 0.15) : height / 2;
        const baseRadius = (center_x < center_y ? center_x : center_y)
        const outer_radius = textProps.includeHeader ? baseRadius * 0.76 : baseRadius
        const inner_radius = outer_radius / 2;
        const handRadius = outer_radius / 20;

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
            values,
        }

        drawAltGauge_1(ctx, props);
    }

    return <CanvasBase draw={draw} sx={sx} />
}

