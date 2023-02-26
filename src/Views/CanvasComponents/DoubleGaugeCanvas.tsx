import { Box, SxProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { drawDoubleGauge } from "./lib/drawGauge";
import { IGaugeProps, IGaugeValues } from "./lib/IGaugeProps";

interface IProps {
    id: string;
    name: string;
    sx?: SxProps;
    values: IGaugeValues,
}

export const DoubleGaugeCanvas = ({id, values, sx, name}: IProps) => {

    const container = useRef<HTMLElement>(null)
    const canvas = useRef<HTMLCanvasElement | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
    const [props, setProps] = useState<IGaugeProps | null>(null);



    if (ctx && props) {
        drawDoubleGauge(ctx, props, values)
    }


    useEffect(() => {

        const initCanvas = () => {
            if (container.current && canvas.current) {
                const context = canvas.current.getContext("2d")
                setCtx(context);
                return context;
            }
            return null;
        }

        const updateCanvasProps = (context: CanvasRenderingContext2D | null) => {
            
            if (!context && !container.current) return;

            let height = container.current!.clientHeight;
            let width = container.current!.clientWidth;
            const center_x = container.current!.clientWidth / 2;
            const center_y = container.current!.clientHeight / 1.8;
            const boxRadius = center_x < center_y ? center_x : center_y;
            const mainRadius = boxRadius / 2.6;
            const topRadius = boxRadius / 1.35;
            const handbaseRadius = mainRadius / 5;

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

            setProps(gaugeProps)
            drawDoubleGauge(context!, gaugeProps, values)


        }

        const context = initCanvas();
        updateCanvasProps(context)

        if (container.current) window.addEventListener("resize", () => updateCanvasProps(ctx));

    }, [ctx, name, values])




    return (
        <Box className="gauge-canvas-container" ref={container}>
            <canvas id={id} ref={canvas} height={props ? props.height : 200} width={props ? props.width : 200}></canvas>
        </Box>
    )
}