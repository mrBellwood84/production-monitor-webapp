import { IGaugeDimension } from "./IGaugeDimension";
import { IGaugeProps } from "./IGaugeProps";
import { IGaugeValues } from "./IGaugeValues";

export const drawAltGauge_1 = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
) => {

    const { dimensions, textProps, values } = props;

    ctx.clearRect(0,0, dimensions.width * 4, dimensions.height * 4);

    ctx.translate(dimensions!.center_x, dimensions!.center_y)

    drawOuterGauge_spiked(ctx, dimensions);
    drawInnerGaugeGradient(ctx, dimensions, values);

    if (textProps.includeTargets) drawHand(ctx, dimensions, values);
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
    
    ctx.lineWidth = 0.75;

    const startRadian = startAngle * Math.PI / 180;
    const endRadian = endAngle * Math.PI / 180;

    const radius = outer_radius * 0.82

    ctx.beginPath();
    ctx.arc(0,0, radius, startRadian, endRadian);
    ctx.stroke();

    let itter = 0;
    for (let i = 0; i < 270; i += 2.7) {
        let j = Math.round(i)
        const rad = (405 + j) * Math.PI / 180;

        ctx.rotate(rad);
        ctx.beginPath()
        ctx.moveTo(0, radius);
        itter % 10 === 0  ? ctx.lineTo(0, radius * 1.05) : ctx.lineTo(0, radius * 1.025);
        ctx.stroke();
        ctx.rotate(-rad);
        itter++;
    }


    let percent = 0;
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = `bold ${radius / 12.5}px Roboto`

    for (let i = 0; i < 271; i += 27) {
        
        const angle = (i + 135) * Math.PI / 180;
        const distance = radius * 1.175;

        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);

        const txt = `${percent}%`
        percent += 10;
        ctx.fillText(txt , x,y)

    }
}

const drawInnerGaugeGradient = (
    ctx: CanvasRenderingContext2D,
    dimensions: IGaugeDimension,
    values: IGaugeValues,
) => {

    const {inner_radius, outer_radius} = dimensions
    const {value, maxTarget} = values

    const outer = outer_radius * 0.8;
    const inner = inner_radius * 1.2;
    
    const startAngle = 135 * Math.PI / 180;

    const angle = value <= maxTarget ? (value / maxTarget * 270) : 270;
    const asRad = angle * Math.PI / 180;
    const endAngle = startAngle + asRad;


    // const endAngle = 405 * Math.PI / 180;

    const grad = ctx.createConicGradient(startAngle, 0, 0);
    grad.addColorStop(0, "#dd0000");
    grad.addColorStop(0.15, "#ff0000");
    grad.addColorStop(0.25, "#dddd00");
    grad.addColorStop(0.45, "#ffff22");
    grad.addColorStop(0.65, "#00aa00");
    grad.addColorStop(1, "#00cc00");


    ctx.fillStyle = grad;

    ctx.beginPath()
    ctx.arc(0, 0, outer, startAngle, endAngle)
    ctx.arc(0, 0, inner, endAngle, startAngle, true)
    ctx.fill();

}


const drawHand = (
    ctx: CanvasRenderingContext2D,
    dimensions: IGaugeDimension,
    values: IGaugeValues,
) => {

    const {value, maxTarget} = values;

    const angle = value < maxTarget ? ((value / maxTarget) * 270) : 270;
    const rotation = (angle - 135) * Math.PI / 180;

    const inner = dimensions.handRadius / 2;
    const outer = dimensions.handRadius;
    const distance = dimensions.inner_radius * 0.8;
    ctx.fillStyle = "#333";
    ctx.strokeStyle = "#333"

    ctx.rotate(rotation)

    ctx.beginPath()
    ctx.arc(0, 0, outer, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(0, 0, inner, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(0,0, outer, 0, 1 * Math.PI, true)
    ctx.arc(0, -distance, 3, 1 * Math.PI, 0)

    ctx.fill()
    ctx.closePath();

    ctx.rotate(-rotation)
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
