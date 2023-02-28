import { Box, SxProps } from "@mui/material";
import { useEffect, useRef, useState } from "react"
import { CanvasDrawFunction } from "./lib/canvasTypes";

interface IProps {
    sx?: SxProps;
    draw: CanvasDrawFunction
}

export const CanvasBase = ({ draw, sx }: IProps) => {

    const divRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>()
    const [rerender, setRerender] = useState<boolean>(false);

    let reRenderBuffer = 0;

    if (canvasRef.current && ctx) {
        draw(ctx, canvasRef.current.clientHeight, canvasRef.current.clientWidth);
    }


    useEffect(() => {

        const setCanvasSize = () => {
            if (!divRef.current || !canvasRef.current) return;

            const canvas = canvasRef.current.getContext("2d");
            setCtx(canvas!)

            canvasRef.current.style.width = "100%";
            canvasRef.current.style.height = "100%";
            canvasRef.current.height = canvasRef.current.offsetHeight;
            canvasRef.current.width = canvasRef.current.offsetWidth;
        }


        setCanvasSize();

        if (canvasRef.current && ctx ) {
            draw(ctx, canvasRef.current.clientHeight, canvasRef.current.clientWidth);
        }

        window.addEventListener("resize", () => {
            reRenderBuffer++;
            setTimeout(() => {
                reRenderBuffer--;
                if (reRenderBuffer === 0) {
                    setRerender(!rerender)
                }
            }, 25)
        })

    },[ctx, draw, rerender])




    return (
        <Box ref={divRef} sx={sx}>
            <canvas ref={canvasRef} height={0} width={0}></canvas>
        </Box>
    )
}