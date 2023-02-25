export interface IGaugeProps {
    height: number;
    width: number;
    center_x: number;
    center_y: number;
    boxRadius: number;
    mainRadius: number;
    topRadius?: number;
    handbaseRadius: number;
}

export interface IGaugeValues {
    minYellow: number;
    minGreen: number;
    max: number;
    value: number;

    minYellowTop?: number;
    minGreenTop?: number;
    maxTop?: number;
    valueTop?: number;
}