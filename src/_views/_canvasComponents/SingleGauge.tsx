import { SxProps } from "@mui/material"
import { CanvasBase } from "./CanvasBase"
import { CanvasDrawFunction } from "./_lib/canvasTypes";
import { IGaugeProps } from "./_lib/IGaugeProps";
import { drawSingleGauge } from "./_lib/drawGauge";
import { IGaugeDimension } from "./_lib/IGaugeDimension";
import { IGaugeValues } from "./_lib/IGaugeValues";
import { IGaugeTextProps } from "./_lib/IGaugeTextProps";

interface IProps {
    textProps: IGaugeTextProps,
    values: IGaugeValues;
    sx?: SxProps;
}

export const SingleGauge = ({ textProps, values, sx }: IProps) => {


    const draw: CanvasDrawFunction = (ctx, height, width) => {
        
        const center_x = width / 2;
        const center_y = height / 2;
        const outer_radius = (center_x < center_y ? center_x : center_y) / (textProps.includeHeader ? 1.2 : 1);
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
            values,
        }

        drawSingleGauge(ctx, props);
    }


    return <CanvasBase draw={draw} sx={sx} />
}