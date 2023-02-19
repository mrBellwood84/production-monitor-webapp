import { IGaugeArch } from "./IGaugeArch";
import { IGaugeProps } from "./IGaugeProps";
import { IGaugeValues } from "./IGaugeValues";

export const calcGaugeArch = (gaugeValues: IGaugeValues, gaugeProps: IGaugeProps): IGaugeArch => {

    const start = 1 - (gaugeProps.skew * 0.1)
    const end = 2 + (gaugeProps.skew * 0.1)
    const range = end - start;

    const yellowBreak = gaugeValues.yellowBreak ? 
        start + (gaugeValues.yellowBreak / gaugeValues.max) + (gaugeProps.skew * 0.1) : 
        start + (range / 3);
    
    const greenBreak = gaugeValues.greenBreak ? 
        start + (gaugeValues.greenBreak / gaugeValues.max) + (gaugeProps.skew * 0.1) : 
        yellowBreak + (range / 3);


    return {
        angleStart: start * Math.PI,
        yellowBreak: yellowBreak * Math.PI,
        greenBreak: greenBreak * Math.PI,
        angleEnd: end * Math.PI,
    }
}