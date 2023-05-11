import { SxProps } from "@mui/material";
import { IGaugeTextProps } from "./_lib/IGaugeTextProps";
import { IGaugeValues } from "./_lib/IGaugeValues";
import { CanvasDrawFunction } from "./_lib/canvasTypes";
import { CanvasBase } from "./CanvasBase";
import { IGaugeDimension } from "./_lib/IGaugeDimension";
import { IGaugeProps } from "./_lib/IGaugeProps";
import { drawAltGauge_3 } from "./_lib/drawAltGauge";

interface IProps {
    textProps: IGaugeTextProps;
    mainValues: IGaugeValues;
    subValues: IGaugeValues;
    sx?: SxProps
}

export const AltGauge3 = ({textProps, mainValues, subValues, sx}: IProps) => {

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