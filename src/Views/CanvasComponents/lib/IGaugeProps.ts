import { IGaugeDimension } from "./IGaugeDimension";
import { IGaugeTextProps } from "./IGaugeTextProps";
import { IGaugeValues } from "./IGaugeValues";

export interface IGaugeProps {
    textProps: IGaugeTextProps;
    dimensions: IGaugeDimension;
    values: IGaugeValues;
}   
