import { IGaugeDimension } from "./IGaugeDimension";
import { IGaugeProps } from "./IGaugeProps";
import { IGaugeValues } from "./IGaugeValues";

export const drawSingleGauge = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
) => {

    const { dimensions, textProps } = props;

    ctx.shadowColor = "#aaa"
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 0.75;
    ctx.shadowBlur = 2;

    const center_x = dimensions.center_x;
    const center_y = dimensions.center_y * (textProps.includeHeader ? 1.25 : 1)

    ctx.clearRect(0,0, dimensions.width * 2, dimensions.height * 2);
    ctx.translate(center_x, center_y);

    drawGaugePart(ctx, 0.75, 1.25, dimensions, "red");
    drawGaugePart(ctx, 1.25, 1.75, dimensions, "yellow");
    drawGaugePart(ctx, 1.75, 2.25, dimensions, "green");
    drawText(ctx, props)

    drawMainHand(ctx, props)

    ctx.translate(-center_x, -center_y);
}

const drawGaugePart = (
    ctx: CanvasRenderingContext2D,
    startAngle: number, 
    endAngle: number, 
    dimensions: IGaugeDimension, 
    color: "red" | "yellow" | "green" 
) => {
    ctx.beginPath();
    ctx.arc(0,0, dimensions.outer_radius, startAngle * Math.PI, endAngle * Math.PI);
    ctx.arc(0,0, dimensions.inner_radius, endAngle * Math.PI, startAngle * Math.PI, true);
    ctx.fillStyle = createLinearGradient(ctx, startAngle, color)
    ctx.fill()
}

const createLinearGradient = (
    ctx: CanvasRenderingContext2D,
    startAngle: number,
    color: "red" | "yellow" | "green",
) => {
    const grad = ctx.createConicGradient(startAngle * Math.PI, 0, 0)

    switch (color) {
        case "red":
            grad.addColorStop(0, "#dd0000")
            grad.addColorStop(0.125, "#ff5050");
            grad.addColorStop(0.25, "#dd0000");
            break;
        case "yellow":
            grad.addColorStop(0, "#dddd00")
            grad.addColorStop(0.125, "#ffff33");
            grad.addColorStop(0.25, "#dddd00");
            break;
        case "green":
            grad.addColorStop(0, "#00aa00")
            grad.addColorStop(0.125, "#00dd00");
            grad.addColorStop(0.25, "#00aa00");
            break;
        default: 
            grad.addColorStop(0, "black")
            break;
    }
    return grad;
}

const drawMainHand = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
) => {

    const { values, dimensions } = props;

    const rotation = calcHandRotation(values)

    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.arc(0,0, dimensions.handRadius, 0, 1 * Math.PI);
    ctx.arc(0, -dimensions.outer_radius / 1.5, dimensions.handRadius / 4, 1 * Math.PI, 0)

    ctx.fillStyle = "#333";
    ctx.fill()

    ctx.rotate(-rotation);
}

const drawText = (ctx: CanvasRenderingContext2D, props: IGaugeProps) => {

    const { values, dimensions, textProps} = props;
    const {value, yellowTarget, greenTarget, maxTarget} = values;
    const { inner_radius, outer_radius } = dimensions;
    const { name, includeHeader, includeTargets, includeValue} = textProps;

    const valueTextSize = outer_radius / 3.5;
    const headerTextSize = outer_radius / 5;
    const targetTextSize = outer_radius / 8;

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#333";

    if (includeHeader) {
        ctx.font = `bold ${headerTextSize}px Roboto`;
        ctx.fillText(name, 0, -outer_radius * 1.25)
    }

    if (includeTargets) {
        ctx.font = `bold ${targetTextSize}px Roboto`;
        ctx.fillText(yellowTarget.toString(), -inner_radius * 1.5, 0);
        ctx.fillText(greenTarget.toString(), 0, -inner_radius * 1.5);
        ctx.fillText(maxTarget.toString(), inner_radius * 1.5, 0);
    }

    if (includeValue) {
        ctx.font = `bold ${valueTextSize}px Roboto`;
        ctx.fillText(value.toString(), 0, (inner_radius * 1.5))
    }
}

const calcHandRotation = (values: IGaugeValues) => {
    
    const { value, yellowTarget, greenTarget, maxTarget } = values;

    if (value <= 0) return 225 * Math.PI / 180;

    if (value < yellowTarget) {
        const angle = (value / yellowTarget * 90) + 225;
        return angle * Math.PI / 180
    }

    if (value < greenTarget) {
        const angle = ((value - yellowTarget) / (greenTarget - yellowTarget) * 90) + 315;
        return angle * Math.PI / 180;
    }

    if (value < maxTarget) {
        const angle = ((value - greenTarget) / (maxTarget - yellowTarget) * 90) + 405;
        return angle * Math.PI / 180;
    }

    if (value >= maxTarget)  return 495 * Math.PI / 180;

    return 0
}
