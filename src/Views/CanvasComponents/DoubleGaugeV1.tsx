import { SxProps } from "@mui/material";
import { IGaugeTextProps } from "./lib/IGaugeTextProps"
import { IGaugeValues } from "./lib/IGaugeValues"
import { CanvasBase } from "./CanvasBase";
import { CanvasDrawFunction } from "./lib/canvasTypes";
import { IGaugeDimension } from "./lib/IGaugeDimension";
import { IGaugeProps } from "./lib/IGaugeProps";
import { drawDoubleGaugeV1 } from "./lib/drawGauge";

interface IProps {
    textProps: IGaugeTextProps;
    mainValues: IGaugeValues;
    subValues: IGaugeValues;
    sx?: SxProps
}

export const DoubleGaugeV1 = ({textProps, mainValues, subValues, sx}: IProps) => {

    const draw: CanvasDrawFunction = (ctx, height, width) => {

        const center_x = width / 2;
        const center_y = height / 2;

        const ratio = width / height;
        const breakpoint = 0.7;

        const mainHeightMod = textProps.includeHeader ? 1.8 : 1.5;
        const subHeightMod = textProps.includeHeader ? 3.6 : 3

        const main_height = ratio > breakpoint ? center_y / mainHeightMod : center_x / breakpoint / mainHeightMod;
        const main_center_y = center_y * 1.4

        const sub_height = ratio > breakpoint ? center_y / subHeightMod : center_x / breakpoint / subHeightMod
        const sub_center_y = main_center_y - main_height * 1.5

        const mainDimensions:IGaugeDimension = {
            height: main_height,
            width,
            center_x,
            center_y: main_center_y,
            outer_radius: main_height,
            inner_radius: main_height / 2,
            handRadius: main_height / 10,

        }

        const subDimensions: IGaugeDimension = {
            height: sub_height,
            width,
            center_x,
            center_y: sub_center_y,
            outer_radius: sub_height,
            inner_radius: sub_height / 2,
            handRadius: sub_height / 10,
        }

        const props: IGaugeProps = {
            textProps,
            dimensions: mainDimensions,
            subDimensions: subDimensions,
            values: mainValues,
            subValues: subValues,
        }


        drawDoubleGaugeV1(ctx, props)

        
    }

    return <CanvasBase draw={draw} sx={sx} />
}