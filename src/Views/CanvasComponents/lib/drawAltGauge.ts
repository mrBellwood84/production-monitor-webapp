import { DisplaySettingsSharp } from "@mui/icons-material";
import { IGaugeDimension } from "./IGaugeDimension";
import { IGaugeProps } from "./IGaugeProps";
import { text } from "stream/consumers";
import { IGaugeValues } from "./IGaugeValues";
import { IGaugeTextProps } from "./IGaugeTextProps";
import { yellow } from "@mui/material/colors";

export const drawAltGauge_1 = (
    ctx: CanvasRenderingContext2D,
    props: IGaugeProps,
) => {

    const { dimensions, textProps, values } = props;

    ctx.clearRect(0,0, dimensions.width * 4, dimensions.height * 4);

    ctx.translate(dimensions!.center_x, dimensions!.center_y)

    drawOuterGauge_spiked(ctx, dimensions);
    drawInnerGaugeGradient(ctx, dimensions, values);
    drawHand(ctx, dimensions, values);

    ctx.translate(0, -dimensions.center_y)

    if (textProps.includeHeader) drawHeaderText(ctx, textProps.name, dimensions);
    if (textProps.includeValue) drawValueText(ctx, dimensions, textProps, values);

    ctx.translate(-dimensions.center_x, 0)

}


const drawOuterGauge_spiked = (
    ctx: CanvasRenderingContext2D,
    dimensions: IGaugeDimension
) => {


    const startAngle = 135;
    const endAngle = 405;
    ctx.strokeStyle = "#333";
    
    ctx.lineWidth = 0.75;

    const startRadian = startAngle * Math.PI / 180;
    const endRadian = endAngle * Math.PI / 180;

    ctx.beginPath();
    ctx.arc(0,0, dimensions.outer_radius, startRadian, endRadian);
    ctx.stroke();

    let itter = 0;
    for (let i = 0; i < 270; i += 2.7) {
        let j = Math.round(i)
        const rad = (405 + j) * Math.PI / 180;

        ctx.rotate(rad);
        ctx.beginPath()
        ctx.moveTo(0, dimensions.outer_radius);
        itter % 10 == 0  ? ctx.lineTo(0, dimensions.outer_radius * 1.05) : ctx.lineTo(0, dimensions.outer_radius * 1.025);
        ctx.stroke();
        ctx.rotate(-rad);
        itter++;
    }


    let percent = 0;
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = `bold ${dimensions.outer_radius / 12.5}px Roboto`

    for (let i = 0; i < 271; i += 27) {
        
        const angle = (i + 135) * Math.PI / 180;
        const distance = dimensions.outer_radius * 1.175;

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

    const outer = outer_radius * 0.95;
    const inner = inner_radius * 1.45;
    
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

    const inner = dimensions.inner_radius / 12 ;
    const outer = dimensions.inner_radius / 8;
    const distance = dimensions.outer_radius / 1.5;
    ctx.fillStyle = "#333";
    ctx.strokeStyle = "#333"

    ctx.rotate(rotation)

    ctx.beginPath()
    ctx.arc(0, 0, outer, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(0, 0, inner, 0, 2 * Math.PI)
    ctx.stroke()
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


    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#333";

    const fontSize = dimensions.outer_radius / 5;
    const y = dimensions.height / 20;

    ctx.font = `bold ${fontSize}px Roboto`;
    ctx.fillText(name, 0, y * 1.25)
}

const drawValueText = (
    ctx: CanvasRenderingContext2D,
    dimensions: IGaugeDimension,
    textProps: IGaugeTextProps,
    values: IGaugeValues,
) => {
    const valueTextSize = dimensions.outer_radius / 3.5;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#333"
    ctx.font = `bold ${valueTextSize}px Roboto`
    ctx.fillText(values.value.toString(), 0, dimensions.height * 0.95 );
}
