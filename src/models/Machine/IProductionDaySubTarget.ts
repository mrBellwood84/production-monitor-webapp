export interface IProductionDaySubTarget {
    id: string;
    timeStart: Date,
    timeEnd: Date,
    minYellow: number;
    minGreen: number;
    max: number;
}