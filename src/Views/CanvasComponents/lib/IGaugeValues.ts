export interface IGaugeValues {
    machineName: string;
    
    yellowTarget: number;
    greenTarget: number;
    maxTarget: number;
    value: number;

    yellowTargetTop?: number;
    greenTargetTop?: number;
    maxTargetTop?: number;
    valueTop?: number;
}