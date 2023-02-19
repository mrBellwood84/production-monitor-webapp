import { calcGaugeHand } from "./calcGaugeHand";
import { IGaugeArch } from "./IGaugeArch";
import { IGaugeProps } from "./IGaugeProps";
import { IGaugeValues } from "./IGaugeValues";

export const drawGauge = (
    ctx: CanvasRenderingContext2D, 
    props: IGaugeProps,
    arch: IGaugeArch,
    values: IGaugeValues,
) => {

    ctx.restore()
    ctx.clearRect(0, 0, props.width, props.height )
    ctx.translate(props.radiusCanvas, props.radiusCanvas);
    
    drawGaugePart(ctx, props, arch.angleStart, arch.yellowBreak, "salmon" );
    drawGaugePart(ctx, props, arch.yellowBreak, arch.greenBreak, "yellow");
    drawGaugePart(ctx, props, arch.greenBreak, arch.angleEnd, "lightgreen");

    ctx.shadowColor = "#444";
    ctx.shadowBlur = 2.5;

    drawHand(ctx, props, values);
    drawText(ctx, props, values)

    ctx.translate(-props.radiusCanvas, -props.radiusCanvas)

}

const drawGaugePart = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    start: number,
    end: number,
    color: string,

) => {
    ctx.beginPath()
    ctx.arc(0,0, props.radiusGauge, start, end, false );
    ctx.strokeStyle = color;
    ctx.lineWidth = props.width * 0.15;
    ctx.stroke();
}

const drawHand = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    values: IGaugeValues,
) => {
    const coor = calcGaugeHand(values, props);

    ctx.beginPath();
    ctx.moveTo(coor.x1, coor.y1);
    ctx.lineTo(coor.x2, coor.y2);
    ctx.lineWidth = props.radiusGauge * 0.055;
    ctx.strokeStyle = "#444";
    ctx.stroke()
}

const drawText = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    values: IGaugeValues,
) => {
    ctx.font = `bold ${props.radiusGauge * 0.35}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(values.count.toString(), 0, -props.radiusGauge*0.1)
}