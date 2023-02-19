import { IGaugeHandCoordinates } from "./IGaugeHandCoordinates";
import { IGaugeProps } from "./IGaugeProps";
import { IGaugeValues } from "./IGaugeValues";

export const calcGaugeHand = (values: IGaugeValues, props: IGaugeProps) => {

    const value = values.count > values.max ? values.max : 
                  values.count <= values.min ? values.min : values.count;

    const angle = (-props.skew * 18) + (value / values.max * (180 + props.skew * 36))

    const radian = angle * (Math.PI / 180);

    const x = Math.cos(radian);
    const y = Math.sin(radian);

    const x1 = (props.radiusGauge * 1.2) * x;
    const y1 = (props.radiusGauge * 1.2) * y;

    const x2 = (props.radiusGauge * 0.5) * x;
    const y2 = (props.radiusGauge * 0.5) * y;

    const res: IGaugeHandCoordinates = {
        x1: -x1,
        x2: -x2,
        y1: -y1,
        y2: -y2,
    }

    return res;

}