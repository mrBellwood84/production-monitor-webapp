import { SxProps } from "@mui/material";
import { CanvasBase } from "./CanvasBase";
import { CanvasDrawFunction } from "./lib/canvasTypes";
import { drawDoubleGauge } from "./lib/drawGauge";
import { IGaugeProps } from "./lib/IGaugeProps";
import { IGaugeValues } from "./lib/IGaugeValues";

interface IProps {
    name: string;
    values: IGaugeValues;
    sx?: SxProps;
}

export const DoubleGaugeCanvas = ({name, values, sx}: IProps) => {

    const draw: CanvasDrawFunction = (ctx, height, width) => {

        const center_x = width / 2;
        const center_y = height / 2;
        const boxRadius = center_x < center_y ? center_x : center_y;
        const mainRadius = boxRadius / 2.6;
        const topRadius = boxRadius / 1.35;
        const handbaseRadius = mainRadius / 7;

        const gaugeProps: IGaugeProps = {
            name,
            height,
            width,
            center_x,
            center_y,
            boxRadius,
            mainRadius,
            topRadius,
            handbaseRadius
        }
        drawDoubleGauge(ctx, gaugeProps, values)
    }

    return <CanvasBase sx={sx} draw={draw} />
}