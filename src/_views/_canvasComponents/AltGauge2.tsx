import { SxProps } from "@mui/material";
import { IGaugeTextProps } from "./_lib/IGaugeTextProps";
import { IGaugeValues } from "./_lib/IGaugeValues";
import { CanvasDrawFunction } from "./_lib/canvasTypes";
import { CanvasBase } from "./CanvasBase";
import { IGaugeDimension } from "./_lib/IGaugeDimension";
import { IGaugeProps } from "./_lib/IGaugeProps";
import { drawAltGauge_2 } from "./_lib/drawAltGauge";

interface IProps {
    textProps: IGaugeTextProps;
    mainValues: IGaugeValues;
    subValues: IGaugeValues;
    sx?: SxProps
}

export const AltGauge2 = ({textProps, mainValues, subValues, sx}: IProps) => {

    const draw: CanvasDrawFunction = (ctx, height, width) => {

        const center_x = width / 2;
        const center_y = textProps.includeHeader ? (height * 0.85 / 2) + (height * 0.15) : height / 2;

        const baseRadius = (center_x < center_y ? center_x : center_y)
        const outer_radius = textProps.includeHeader ? baseRadius * 0.76 : baseRadius
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

        const subDimensions: IGaugeDimension = {
            ...dimensions,
            outer_radius: outer_radius * 0.95,
            inner_radius: inner_radius * 1.25
        }

        const props: IGaugeProps = {
            textProps,
            dimensions,
            subDimensions,
            values: mainValues,
            subValues,
        }

        drawAltGauge_2(ctx, props);
    }

    

    return <CanvasBase draw={draw} sx={sx} />

}