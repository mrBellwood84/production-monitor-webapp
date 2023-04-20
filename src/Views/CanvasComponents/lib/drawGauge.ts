import { visitLexicalEnvironment } from "typescript";
import { IGaugeDimension } from "./IGaugeDimension";
import { IGaugeProps } from "./IGaugeProps";
import { IGaugeTextProps } from "./IGaugeTextProps";
import { IGaugeValues } from "./IGaugeValues";

export const drawSingleGauge = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
) => {

    const { dimensions, textProps, values } = props;

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
    drawText(ctx, dimensions, textProps, values);
    if (textProps.includeHeader) drawHeaderText(ctx, textProps.name, -dimensions.outer_radius, dimensions.outer_radius / 5)

    drawHand270(ctx, values, dimensions)

    ctx.translate(-center_x, -center_y);
}

export const drawDoubleGaugeV1 = (
    ctx: CanvasRenderingContext2D, 
    props: IGaugeProps
) => {

    const { dimensions, subDimensions, values, subValues, textProps } = props;

    ctx.clearRect(0,0, dimensions.width * 2, (dimensions.height + subDimensions!.height) * 2);

    ctx.shadowColor = "#aaa"
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 0.75;
    ctx.shadowBlur = 2;

    ctx.translate(subDimensions!.center_x, subDimensions!.center_y)
    drawGaugePart(ctx, 0.75, 1.25, subDimensions!, "red");
    drawGaugePart(ctx, 1.25, 1.75, subDimensions!, "yellow");
    drawGaugePart(ctx, 1.75, 2.25, subDimensions!, "green");
    drawHand270(ctx, subValues!, subDimensions!)
    drawText(ctx, subDimensions!, textProps, subValues!);    
    ctx.translate(-subDimensions!.center_x, -subDimensions!.center_y)

    ctx.translate(dimensions.center_x, dimensions.center_y)
    drawGaugePart(ctx, 0.75, 1.25, dimensions, "red");
    drawGaugePart(ctx, 1.25, 1.75, dimensions, "yellow");
    drawGaugePart(ctx, 1.75, 2.25, dimensions, "green");
    drawHand270(ctx, values, dimensions!)
    drawText(ctx, dimensions, textProps, values);    
    ctx.translate(-dimensions.center_x, -dimensions.center_y)


    if (textProps.includeHeader) {
        const header_y = -subDimensions!.outer_radius * 1.25;
        ctx.translate(dimensions.center_x, subDimensions!.center_y)
        drawHeaderText(ctx, textProps.name, header_y, dimensions.outer_radius / 5)
        ctx.translate(-dimensions.center_x, -subDimensions!.center_y)
    }
}

export const drawDoubleGaugeV2 = (
    ctx: CanvasRenderingContext2D, 
    props: IGaugeProps
) => {

    const { dimensions, subDimensions, values, subValues, textProps } = props;

    ctx.clearRect(0,0, dimensions.width * 2, (dimensions.height + subDimensions!.height) * 2);

    ctx.shadowColor = "#aaa"
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 0.75;
    ctx.shadowBlur = 2;

    const mod = (0.5 / 3)

    ctx.translate(subDimensions!.center_x, subDimensions!.center_y)
    drawGaugePart(ctx, 1.25, 1.25 + mod, subDimensions!, "red", 0.25 / 4);
    drawGaugePart(ctx, 1.25 + mod, 1.25 + (2 * mod), subDimensions!, "yellow", 0.25 / 6);
    drawGaugePart(ctx, 1.25 + (2 * mod), 1.75, subDimensions!, "green", 0.25 / 8);
    drawHand90(ctx, subValues!, subDimensions!)
    drawText(ctx, subDimensions!, textProps, subValues!);    
    ctx.translate(-subDimensions!.center_x, -subDimensions!.center_y)

    ctx.translate(dimensions.center_x, dimensions.center_y)
    drawGaugePart(ctx, 0.75, 1.25, dimensions, "red");
    drawGaugePart(ctx, 1.25, 1.75, dimensions, "yellow");
    drawGaugePart(ctx, 1.75, 2.25, dimensions, "green");
    drawHand270(ctx, values, dimensions!)
    drawText(ctx, dimensions, textProps, values);    
    ctx.translate(-dimensions.center_x, -dimensions.center_y)

    const header_y = -subDimensions!.outer_radius * 0.95;

    if (textProps.includeHeader) {
        ctx.translate(dimensions.center_x, subDimensions!.center_y)
        drawHeaderText(ctx, textProps.name, header_y, dimensions.outer_radius / 5)
        ctx.translate(-dimensions.center_x, -subDimensions!.center_y)
    }
}



const drawGaugePart = (
    ctx: CanvasRenderingContext2D,
    startAngle: number, 
    endAngle: number, 
    dimensions: IGaugeDimension, 
    color: "red" | "yellow" | "green",
    gradientMod: number = 0.125,
) => {
    ctx.beginPath();
    ctx.arc(0,0, dimensions.outer_radius, startAngle * Math.PI, endAngle * Math.PI);
    ctx.arc(0,0, dimensions.inner_radius, endAngle * Math.PI, startAngle * Math.PI, true);
    ctx.fillStyle = createLinearGradient(ctx, startAngle, color, gradientMod)
    ctx.fill()
}

const createLinearGradient = (
    ctx: CanvasRenderingContext2D,
    startAngle: number,
    color: "red" | "yellow" | "green",
    angleMod: number,
) => {
    const grad = ctx.createConicGradient(startAngle * Math.PI, 0, 0)

    switch (color) {
        case "red":
            grad.addColorStop(0, "#dd0000")
            grad.addColorStop(angleMod, "#ff4040");
            grad.addColorStop(angleMod * 2, "#dd0000");
            break;
        case "yellow":
            grad.addColorStop(0, "#dddd00")
            grad.addColorStop(angleMod, "#ffff22");
            grad.addColorStop(angleMod * 2, "#dddd00");
            break;
        case "green":
            grad.addColorStop(0, "#00aa00")
            grad.addColorStop(angleMod, "#00cc00");
            grad.addColorStop(angleMod * 2, "#00aa00");
            break;
        default: 
            grad.addColorStop(0, "black")
            break;
    }
    return grad;
}

const drawHand270 = (
    ctx: CanvasRenderingContext2D,
    values: IGaugeValues,
    dimensions: IGaugeDimension,
) => {

    const rotation = calcHandRotation270(values)

    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.arc(0,0, dimensions.handRadius, 0, 1 * Math.PI);
    ctx.arc(0, -dimensions.outer_radius / 1.5, dimensions.handRadius / 4, 1 * Math.PI, 0)

    ctx.fillStyle = "#333";
    ctx.fill()

    ctx.rotate(-rotation);
}

const drawHand90 = (
    ctx: CanvasRenderingContext2D,
    values: IGaugeValues,
    dimensions: IGaugeDimension,
) => {

    const rotation = calcHandRotation90(values)

    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.arc(0,-dimensions.inner_radius, dimensions.handRadius, 0, 1 * Math.PI);
    ctx.arc(0, -dimensions.outer_radius, dimensions.handRadius / 4, 1 * Math.PI, 0)

    ctx.fillStyle = "#333";
    ctx.fill()

    ctx.rotate(-rotation);
}

const drawHeaderText = (
    ctx: CanvasRenderingContext2D,
    name: string,
    y: number,
    fontSize: number,
) => {
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#333";

    ctx.font = `bold ${fontSize}px Roboto`;
    ctx.fillText(name, 0, y * 1.25)
}

const drawText = (
    ctx: CanvasRenderingContext2D, 
    dimensions: IGaugeDimension,
    textProps: IGaugeTextProps,
    values: IGaugeValues,
) => {

    const { includeTargets, includeValue} = textProps;
    if (!includeTargets && !includeValue) return;

    const {value, yellowTarget, greenTarget, maxTarget} = values;
    const { inner_radius, outer_radius } = dimensions;

    const valueTextSize = outer_radius / 3.5;
    const targetTextSize = outer_radius / 8;

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#333";

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

const calcHandRotation270 = (values: IGaugeValues):number => {
    
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
        const angle = ((value - greenTarget) / (maxTarget - greenTarget) * 90) + 405;
        return angle * Math.PI / 180;
    }

    if (value >= maxTarget)  return 495 * Math.PI / 180;

    return 0;
}

const calcHandRotation90 = (values: IGaugeValues): number  => {

    const { value, yellowTarget, greenTarget, maxTarget } = values;

    if (value <= 0) return 315 * Math.PI / 180;

    if (value < yellowTarget) {
        const angle = (value / yellowTarget * 30) + 315;
        return angle * Math.PI / 180;
    }

    if (value < greenTarget) {
        const angle = ((value - yellowTarget) / (greenTarget - yellowTarget) * 30) + 345;
        return angle * Math.PI / 180;
    }

    if (value < maxTarget) {
        const angle =((value - greenTarget) / (maxTarget - greenTarget) * 30) + 375;
        return angle * Math.PI / 180;
    }

    if (value >= maxTarget) return 405 * Math.PI / 180;

    return 0;
}