import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { drawDoubleGauge } from "./lib/drawGauge";
import { IGaugeProps, IGaugeValues } from "./lib/IGaugeProps";

interface IProps {
    id: string;
    height: number,
    width: number,
    values: IGaugeValues,
}

export const DoubleGaugeCanvas = ({id, height, width, values}: IProps) => {

    const elemRef = useRef<HTMLCanvasElement | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
    const [props, setProps] = useState<IGaugeProps | null>(null);

    useEffect(() => {
        if (elemRef.current) {

            const context = elemRef.current.getContext("2d")

            const center_x = width / 2;
            const center_y = height / 1.55;

            const boxRadius = center_x < center_y ? center_x : center_y;
            const mainRadius = boxRadius / 2;
            const topRadius = boxRadius;
            const handbaseRadius = mainRadius / 4;

            const props: IGaugeProps = {
                height,
                width,
                center_x,
                center_y,
                mainRadius,
                boxRadius,
                handbaseRadius,
                topRadius,
            }

            context?.save();

            drawDoubleGauge(context!, props, values)

            setCtx(context);
            setProps(props)
        }
    }, [ctx, width, height])




    return (
        <Box className="gauge-canvas-container" sx={{border: "1px solid black"}}>
            <canvas id={id} ref={elemRef} height={height} width={width}></canvas>
        </Box>
    )
}