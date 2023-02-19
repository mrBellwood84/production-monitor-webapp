import { useEffect, useState, useRef } from "react";
import { calcGaugeArch } from "./lib/calcGaugeArch";
import { drawGauge } from "./lib/drawGauge";
import { IGaugeArch } from "./lib/IGaugeArch";
import { IGaugeProps } from "./lib/IGaugeProps";
import { IGaugeValues } from "./lib/IGaugeValues";

type GaugeSkew = -1 | 0 | 1;

interface IProps {
    width: number;
    height: number;
    values: IGaugeValues,
    skew: GaugeSkew,
}

export const Gauge = ({height, width, values, skew}: IProps) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [props, setProps] = useState<IGaugeProps | null>(null);
    const [arch, setArch] = useState<IGaugeArch | null>(null);

    if(ctx && props && arch) {
        drawGauge(ctx, props, arch, values)
    }

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d");

            const gaugeProps: IGaugeProps = {
                width: width,
                height: height,
                
                radiusCanvas: width / 2,
                radiusGauge: (width / 2) * 0.8,

                skew: skew,
            }

            const gaugeArch = calcGaugeArch(values, gaugeProps)


            context?.save()

            drawGauge(context!, gaugeProps, gaugeArch, values)

            setCtx(context);
            setProps(props)
            setArch(gaugeArch);
        }
    },[ctx, height, width, props, skew, values])

    return <canvas height={height} width={width} ref={canvasRef}></canvas>



}