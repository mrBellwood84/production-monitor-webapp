export default null;

// import { IGaugeProps } from "./IGaugeProps"
// import { IGaugeValues } from "./IGaugeValues"

// export const drawGauge_old = (
//     ctx: CanvasRenderingContext2D,
//     props: IGaugeProps,
//     values: IGaugeValues
// ) => {

//     try {
//         ctx.clearRect(0, 0, props.width * 2, props.height * 2)
//         ctx.translate(props.center_x, props.center_y + (props.center_y / 20));

//         drawHeader(ctx, props)

//         drawMainGaugePart(ctx, props, 0.75 * Math.PI, 1.25 * Math.PI, "red")
//         drawMainGaugePart(ctx, props, 1.25 * Math.PI, 1.75 * Math.PI, "yellow")
//         drawMainGaugePart(ctx, props, 1.75 * Math.PI, 2.25 * Math.PI, "green")

//         drawTopGaugePart(ctx, props, 1.25 * Math.PI, (1.25 + (0.5 / 3)) * Math.PI, "red")
//         drawTopGaugePart(ctx, props, (1.25 + (0.5 / 3)) * Math.PI, (1.25 + (0.5 / 3 * 2)) * Math.PI, "yellow")
//         drawTopGaugePart(ctx, props, (1.25 + (0.5 / 3 * 2)) * Math.PI, 1.75 * Math.PI, "green" );

//         drawMainHand(ctx,props, values)
//         drawTopHand(ctx,props, values)

//         drawBottomText(ctx, props, values)

//         ctx.translate(-props.center_x, -(props.center_y + (props.center_y / 20)));
//     } catch {}
// }

// const drawHeader = (
//     ctx: CanvasRenderingContext2D,
//     props: IGaugeProps
// ) => {
//     const fontSize = props.mainRadius / 2.8;

//     ctx.font = `${fontSize}px Roboto`
//     ctx.textAlign = "center"
//     ctx.fillText(props.name, 0, - props.boxRadius / 1.10);
// }

// const drawBottomText = (
//     ctx: CanvasRenderingContext2D,
//     props: IGaugeProps,
//     values: IGaugeValues
// ) => {
//     const smallFontSize = props.mainRadius / 5;
//     const largeFontSize = props.mainRadius / 2.3;

//     ctx.font = `${smallFontSize}px Roboto`
//     ctx.textAlign = "left";
//     ctx.fillText("0", -props.mainRadius * 1.1, props.mainRadius * 1.3);
//     ctx.textAlign = "right";
//     ctx.fillText(values.maxTarget.toString(), props.mainRadius * 1.1, props.mainRadius * 1.3);

//     ctx.font = `${largeFontSize}px Roboto`
//     ctx.textAlign = "center";
//     ctx.fillText(values.value.toString(), 0, props.mainRadius * 1.95 );


// }


// const drawTopGaugePart = (
//     ctx: CanvasRenderingContext2D,
//     props: IGaugeProps,
//     start: number,
//     end: number,
//     color: string,
// ) => {
//     ctx.beginPath();
//     ctx.arc(0, 0, props.topRadius!, start, end, false);
//     ctx.strokeStyle = createLinearGradient(ctx, color, props.boxRadius!);
//     ctx.lineWidth = props.mainRadius / 3;
//     ctx.stroke();
// }



// const drawTopHand = (
//     ctx: CanvasRenderingContext2D,
//     props: IGaugeProps,
//     values: IGaugeValues,
// ) => {

//     const rotation = calcTopArrowRotation(values)
//     ctx.rotate(rotation);

//     ctx.beginPath();

//     const x_outerRight = props.boxRadius / 40;
//     const x_outerLeft = -x_outerRight;
//     const x_innerRight = props.boxRadius / 150;
//     const x_innerLeft = -x_innerRight;

//     const y_innerBottom = -(props.topRadius! - (props.topRadius! / 11));
//     const y_innerTop = -(props.topRadius! + (props.topRadius! / 11));
//     // const y_outerTop = y_innerTop - (props.topRadius! / 25);
//     const y_outerBottom = y_innerBottom + (props.topRadius! / 25);

//     ctx.moveTo(x_outerLeft, y_outerBottom);
//     ctx.lineTo(x_outerRight, y_outerBottom);
//     ctx.lineTo(x_innerRight, y_innerBottom);
//     ctx.lineTo(x_innerRight, y_innerTop);
//     // ctx.lineTo(x_outerRight, y_outerTop);
//     // ctx.lineTo(x_outerLeft, y_outerTop);
//     ctx.lineTo(x_innerLeft, y_innerTop);
//     ctx.lineTo(x_innerLeft, y_innerBottom);
//     ctx.lineTo(x_outerLeft, y_outerBottom)

//     // ctx.moveTo(0, -(props.topRadius! - (props.topRadius! / 11)))
//     // ctx.lineTo(0, -(props.topRadius! + (props.topRadius! / 11)))
//     ctx.fillStyle = "#333";
//     ctx.lineWidth = 1;
//     ctx.fill()

//     ctx.rotate(-rotation);
// }



// const calcMainArrowRotation = (values: IGaugeValues) => {
    
//     if (values.value <= 0) return 225 * Math.PI / 180;

//     if (values.value < values.yellowTarget) {
//         const angle = (values.value / values.yellowTarget * 90) + 225;
//         return angle * Math.PI / 180;
//     }

//     if (values.value < values.greenTarget) {
//         const angle = ((values.value - values.yellowTarget) / (values.greenTarget - values.yellowTarget) * 90) + 315;
//         return angle * Math.PI / 180;
//     }

//     if (values.value < values.maxTarget) {
//         const angle = ((values.value - values.greenTarget) / (values.maxTarget - values.greenTarget) * 90) + 405;
//         return angle * Math.PI / 180;
//     }

//     if (values.value >= values.maxTarget) return 495 * Math.PI / 180;

//     return 0
// }

// const calcTopArrowRotation = (values: IGaugeValues) => {

//     if (values.valueTop! <= 0) return 315 * Math.PI / 180;

//     if (values.valueTop! < values.yellowTargetTop!) {
//         const angle = (values.valueTop! / values.yellowTargetTop! * 30) + 315;
//         return angle * Math.PI / 180;
//     }

//     if (values.valueTop! < values.greenTargetTop!) {
//         const angle =  ((values.valueTop! - values.yellowTargetTop!) / 
//                         (values.greenTargetTop! - values.yellowTargetTop!) * 30) + 345;
//         return angle * Math.PI / 180;
//     }

//     if (values.valueTop! < values.maxTargetTop!) {
//         const angle =  ((values.valueTop! - values.greenTargetTop!) / 
//                         (values.maxTargetTop! - values.greenTargetTop!) * 30) + 375;
//         return angle * Math.PI / 180;
//     }

//     if (values.valueTop! >= values.maxTargetTop!) return 405 * Math.PI / 180;


//     return 2

// }