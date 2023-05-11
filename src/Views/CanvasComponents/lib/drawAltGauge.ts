import { IGaugeDimension } from "./IGaugeDimension";
import { IGaugeProps } from "./IGaugeProps";
import { IGaugeValues } from "./IGaugeValues";
import { colorHex } from "./colorHex";

export const drawAltGauge_1 = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
) => {

    const { dimensions, textProps, values, subValues } = props;

    ctx.clearRect(0,0, dimensions.width * 4, dimensions.height * 4);

    ctx.translate(dimensions!.center_x, dimensions!.center_y)

    drawOuterGaugeGradient(ctx, dimensions, values);
    drawOuterGauge_spiked(ctx, dimensions);

    drawInnerGauge_alt1(ctx, dimensions);
    drawInngerGaugeHand_alt1(ctx, subValues!, dimensions);

    if (textProps.includeHeader) drawHeaderText(ctx, textProps.name, dimensions);
    if (textProps.includeValue) drawValueText(ctx, dimensions, values);

    ctx.translate(-dimensions.center_x, -dimensions.center_y)

}

export const drawAltGauge_2 = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps
) => {
    const {dimensions, subDimensions, textProps, values} = props

    ctx.clearRect(0,0, dimensions.width * 2, dimensions.height * 2);
    ctx.translate(dimensions.center_x, dimensions.center_y);

    ctx.beginPath()
    ctx.arc(0, 0, dimensions.outer_radius, 0, 1 * Math.PI, true);
    ctx.stroke();
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(0, 0, dimensions.inner_radius, 0, 1 * Math.PI, true);
    ctx.stroke();
    ctx.closePath()

    drawHeaderText(ctx, textProps.name, dimensions)
    ctx.translate(-dimensions.center_x, -dimensions.center_y);


    ctx.translate(subDimensions!.center_x, subDimensions!.center_y);

    ctx.beginPath()
    ctx.arc(0, 0,subDimensions!.outer_radius , 0.25 * Math.PI, 0.75 * Math.PI);
    ctx.stroke();
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(0, 0, subDimensions!.inner_radius, 0.25 * Math.PI, 0.75 * Math.PI);
    ctx.stroke();
    ctx.closePath()

    ctx.translate(-subDimensions!.center_x, -subDimensions!.center_y);

}

export const drawAltGauge_3 = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps
) => {
    const {dimensions, textProps, values} = props

    ctx.clearRect(0,0, dimensions.width * 2, dimensions.height * 2);
    ctx.translate(dimensions.center_x, dimensions.center_y);

    ctx.beginPath()
    ctx.arc(0, 0, dimensions.outer_radius, 0, 1 * Math.PI, true);
    ctx.stroke();
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(0, 0, dimensions.inner_radius, 0, 1 * Math.PI, true);
    ctx.stroke();
    ctx.closePath()

    ctx.strokeRect(-dimensions.outer_radius, dimensions.inner_radius * 0.5, dimensions.outer_radius * 2, dimensions.inner_radius * 0.75)

    drawHeaderText(ctx, textProps.name, dimensions)
    ctx.translate(-dimensions.center_x, -dimensions.center_y);

}

const drawOuterGauge_spiked = (
    ctx: CanvasRenderingContext2D,
    dimensions: IGaugeDimension
) => {

    const { outer_radius } = dimensions;

    const startAngle = 135;
    const endAngle = 405;
    ctx.strokeStyle = "#333";
    ctx.fillStyle = "#333";
    
    const startRadian = startAngle * Math.PI / 180;
    const endRadian = endAngle * Math.PI / 180;

    const radius = outer_radius * 0.9

    ctx.lineWidth = 1.25
    ctx.beginPath();
    ctx.arc(0,0, radius, startRadian, endRadian);
    ctx.stroke();

    let itter = 0;
    const short = radius * 0.9
    const long = radius * 0.8
    const breakpoint = radius * 0.5

    for (let i = 0; i < 271; i += 1.8) {
        let j = Math.round(i)
        const rad = (405 + i) * Math.PI / 180;

        ctx.rotate(rad);
        ctx.beginPath()
        ctx.moveTo(0, radius);

        if (itter % 50 === 0) {
            ctx.lineWidth = 1.5;
            ctx.lineTo(0, breakpoint);
        } else if (itter % 10 === 0) {
            ctx.lineWidth = 1;
            ctx.lineTo(0, long)
        } else {
            ctx.lineWidth = 0.75;
            ctx.lineTo(0,short);
        }

        ctx.stroke();
        ctx.rotate(-rad);
        itter++;
    }


    let percent = 0;
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = `bold ${radius / 15}px Roboto`

    for (let i = 0; i < 271; i += 18) {

        const angle = (i + 135) * Math.PI / 180;
        const distance = radius * 1.09;

        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);

        const txt = `${percent}%`
        percent += 10;
        ctx.fillText(txt , x,y)
    }
}

const drawOuterGaugeGradient = (
    ctx: CanvasRenderingContext2D,
    dimensions: IGaugeDimension,
    values: IGaugeValues,
) => {

    const {inner_radius, outer_radius} = dimensions
    // const {value, maxTarget} = values

    const outer = outer_radius * 0.9;
    const inner = outer_radius * 0.7;
    
    const startAngle = 135 * Math.PI / 180;
    const endAngle = (135 + 270) * Math.PI / 180;

    const angleGradient = calcOuterGaugeGradient(values);

    const breakGrad = startAngle + angleGradient;

    const fillGrad = ctx.createConicGradient(startAngle, 0, 0);
    fillGrad.addColorStop(0, colorHex.redD);
    fillGrad.addColorStop(0.15, colorHex.redL);
    fillGrad.addColorStop(0.25, colorHex.yellowD);
    fillGrad.addColorStop(0.45, colorHex.yellowL);
    fillGrad.addColorStop(0.65, colorHex.greenL);
    fillGrad.addColorStop(1, colorHex.greenD);

    ctx.fillStyle = fillGrad;

    ctx.beginPath()
    ctx.arc(0, 0, outer, startAngle, breakGrad)
    ctx.arc(0, 0, inner, breakGrad, startAngle, true)
    ctx.fill();

}

const drawInnerGauge_alt1 = (
    ctx: CanvasRenderingContext2D,
    dimensions: IGaugeDimension,
) => {
    const { inner_radius } = dimensions;

    const outer = inner_radius;
    const inner = inner_radius / 2;

    const initStartAngle = 135;
    
    let colors: ["red", "yellow", "green"] = ["red", "yellow", "green"]
    let cIndex = 0;

    for (let i = 0; i < 270; i += 90 ) {

        const startRad = (i + initStartAngle) * Math.PI / 180;
        const endRad = (i + 90 + initStartAngle) * Math.PI / 180;

        ctx.fillStyle = createConicGradient(
            ctx,
            colors[cIndex++],
            startRad,
            0.125
        )
        ctx.beginPath();
        ctx.arc(0,0, outer, startRad, endRad);
        ctx.arc(0,0, inner, endRad, startRad, true);
        ctx.fill();
    }
}

const drawInngerGaugeHand_alt1 = (
    ctx: CanvasRenderingContext2D,
    values: IGaugeValues,
    dimensions: IGaugeDimension,
) => {

    const { inner_radius, handRadius } = dimensions;
    const rotation = calcHandRotation270(values);

    const outer = inner_radius;
    const inner = inner_radius / 2;

    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.arc(0, -inner, handRadius, 0, 1 * Math.PI);
    ctx.arc(0, -outer, handRadius / 4, 1*Math.PI, 0);
    ctx.fillStyle = "#333";
    ctx.fill();

    ctx.rotate(-rotation);
}

const drawHeaderText = (
    ctx: CanvasRenderingContext2D,
    name: string,
    dimensions: IGaugeDimension
) => {

    const fontSize = dimensions.outer_radius / 5;
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#333";
    ctx.font = `bold ${fontSize}px Roboto`;


    const y = -(dimensions.outer_radius * 1.15);

    ctx.fillText(name, 0, y)
}

const drawValueText = (
    ctx: CanvasRenderingContext2D,
    dimensions: IGaugeDimension,
    values: IGaugeValues,
) => {
    const valueTextSize = dimensions.outer_radius / 3.5;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#333"
    ctx.font = `bold ${valueTextSize}px Roboto`

    const y = dimensions.outer_radius * 0.75;


    ctx.fillText(values.value.toString(), 0, y );
}

const calcOuterGaugeGradient = (
    values: IGaugeValues,
) => {
    const { value, greenTarget} = values;
    const maxTarget = greenTarget * 1.5;

    if (value <= 0) return 0 * Math.PI / 180;

    if (value < maxTarget) {
        const angle = (value / greenTarget * 180);
        return angle * Math.PI / 180;
    }

    if (value >= maxTarget) return 270 * Math.PI / 180

    return 0

}

const createConicGradient = (
    ctx: CanvasRenderingContext2D,
    color: "red" | "green" | "yellow",
    startAngle: number,
    angleMod: number,
): CanvasGradient => {
    const grad = ctx.createConicGradient(startAngle, 0, 0);

    switch(color) {
        case "red":
            grad.addColorStop(0, colorHex.redD)
            grad.addColorStop(angleMod, colorHex.redL);
            grad.addColorStop(angleMod * 2, colorHex.redD);
            break;
        case "green":
            grad.addColorStop(0, colorHex.greenD)
            grad.addColorStop(angleMod, colorHex.greenL);
            grad.addColorStop(angleMod * 2, colorHex.greenD);
            break;
        case "yellow":
            grad.addColorStop(0, colorHex.yellowD)
            grad.addColorStop(angleMod, colorHex.yellowL);
            grad.addColorStop(angleMod * 2, colorHex.yellowD);
            break;
        default: 
            grad.addColorStop(0, "black");
            break;
    }

    return grad;
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