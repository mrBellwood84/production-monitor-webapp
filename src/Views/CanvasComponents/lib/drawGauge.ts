import { height } from "@mui/system";
import { IGaugeProps, IGaugeValues } from "./IGaugeProps"

export const drawDoubleGauge = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    values: IGaugeValues
) => {

    
    try {
        ctx.clearRect(0, 0, props.width, props.height)
        ctx.translate(props.center_x, props.center_y);

        ctx.shadowBlur = 0;
        drawHeader(ctx, props)

        drawMainGaugePart(ctx, props, 0.75 * Math.PI, 1.25 * Math.PI, "red")
        drawMainGaugePart(ctx, props, 1.25 * Math.PI, 1.75 * Math.PI, "yellow")
        drawMainGaugePart(ctx, props, 1.75 * Math.PI, 2.25 * Math.PI, "green")

        drawTopGaugePart(ctx, props, 1.25 * Math.PI, (1.25 + (0.5 / 3)) * Math.PI, "red")
        drawTopGaugePart(ctx, props, (1.25 + (0.5 / 3)) * Math.PI, (1.25 + (0.5 / 3 * 2)) * Math.PI, "yellow")
        drawTopGaugePart(ctx, props, (1.25 + (0.5 / 3 * 2)) * Math.PI, 1.75 * Math.PI, "green" );

        ctx.shadowColor = "#555"
        ctx.shadowBlur = 2;

        drawMainHand(ctx,props, values)
        drawTopHand(ctx,props, values)

        ctx.shadowBlur = 0;
        drawBottomText(ctx, props, values)

        ctx.translate(-props.center_x, -props.center_y);
    } catch { }

}

const drawHeader = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps
) => {
    const fontSize = props.mainRadius / 2.2;

    ctx.font = `${fontSize}px Roboto`
    ctx.textAlign = "center"
    ctx.fillText(props.name, 0, - props.boxRadius / 1.16);
}

const drawBottomText = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    values: IGaugeValues
) => {
    const smallFontSize = props.mainRadius / 5;
    const largeFontSize = props.mainRadius / 2.3;

    ctx.font = `${smallFontSize}px Roboto`
    ctx.textAlign = "left";
    ctx.fillText("0", -props.mainRadius * 1.1, props.mainRadius * 1.3);
    ctx.textAlign = "right";
    ctx.fillText(values.max.toString(), props.mainRadius * 1.1, props.mainRadius * 1.3);

    ctx.font = `${largeFontSize}px Roboto`
    ctx.textAlign = "center";
    ctx.fillText(values.value.toString(), 0, props.mainRadius * 1.95 );


}

const drawMainGaugePart = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    start: number,
    end: number,
    color: string,
) => {
    ctx.beginPath();
    ctx.arc(0,0, props.mainRadius, start, end, false);
    ctx.strokeStyle = createLinearGradient(ctx, color, props.boxRadius)!
    ctx.lineWidth = props.mainRadius / 1;
    ctx.stroke();
}

const drawTopGaugePart = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    start: number,
    end: number,
    color: string,
) => {
    ctx.beginPath();
    ctx.arc(0, 0, props.topRadius!, start, end, false);
    ctx.strokeStyle = createLinearGradient(ctx, color, props.boxRadius!);
    ctx.lineWidth = props.mainRadius / 3;
    ctx.stroke();
}

const drawMainHand = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    values: IGaugeValues,
) => {

    const rotation = calcMainArrowRotation(values)

    ctx.rotate(rotation)

    ctx.beginPath();
    ctx.arc(0,0, props.handbaseRadius, 0, 1 * Math.PI);
    ctx.arc(0, -props.mainRadius, (props.handbaseRadius / 4), 1 * Math.PI, 0)
    ctx.fillStyle = "#112";
    ctx.fill();

    ctx.rotate(-rotation)
}

const drawTopHand = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
    values: IGaugeValues,
) => {

    const rotation = calcTopArrowRotation(values)
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.moveTo(0, -(props.topRadius! - (props.topRadius! / 11)))
    ctx.lineTo(0, -(props.topRadius! + (props.topRadius! / 11)))
    ctx.strokeStyle = "#112";
    ctx.lineWidth = props.topRadius! / 11;
    ctx.stroke();

    ctx.rotate(-rotation);
}

const createLinearGradient = (
    ctx: CanvasRenderingContext2D,
    color: string,
    gridBase: number,
) => {
    if (color === "red") {
        const grad = ctx.createLinearGradient(0, 0, -gridBase, 0);
        grad.addColorStop(0, "#cc0000");
        grad.addColorStop(1, "#ff3333");
        return grad;
    }
    if (color === "yellow") {
        const grad = ctx.createLinearGradient(0,0, 0, -gridBase);
        grad.addColorStop(0, "#e6e600");
        grad.addColorStop(1, "#ffff80");
        return grad;
    }

    if (color === "green") {
        const grad = ctx.createLinearGradient(gridBase, 0, 0, 0);
        grad.addColorStop(0, "#009900")
        grad.addColorStop(1, "#006600")
        return grad;
    }
    return color;


}

const calcMainArrowRotation = (values: IGaugeValues) => {
    
    if (values.value <= 0) return 225 * Math.PI / 180;

    if (values.value < values.minYellow) {
        const angle = (values.value / values.minYellow * 90) + 225;
        return angle * Math.PI / 180;
    }

    if (values.value < values.minGreen) {
        const angle = ((values.value - values.minYellow) / (values.minGreen - values.minYellow) * 90) + 315;
        return angle * Math.PI / 180;
    }

    if (values.value < values.max) {
        const angle = ((values.value - values.minGreen) / (values.max - values.minGreen) * 90) + 405;
        return angle * Math.PI / 180;
    }

    if (values.value >= values.max) return 495 * Math.PI / 180;

    return 0
}

const calcTopArrowRotation = (values: IGaugeValues) => {

    if (values.valueTop! <= 0) return 315 * Math.PI / 180;

    if (values.valueTop! < values.minYellowTop!) {
        const angle = (values.valueTop! / values.minYellowTop! * 30) + 315;
        return angle * Math.PI / 180;
    }

    if (values.valueTop! < values.minGreenTop!) {
        const angle =  ((values.valueTop! - values.minYellowTop!) / 
                        (values.minGreenTop! - values.minYellowTop!) * 30) + 345;
        return angle * Math.PI / 180;
    }

    if (values.valueTop! < values.maxTop!) {
        const angle =  ((values.valueTop! - values.minGreenTop!) / 
                        (values.maxTop! - values.minGreenTop!) * 30) + 375;
        return angle * Math.PI / 180;
    }

    if (values.valueTop! >= values.maxTop!) return 405 * Math.PI / 180;


    return 2

}