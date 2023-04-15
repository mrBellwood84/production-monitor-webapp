import { IMachine } from "../Machine/IMachine";

export interface IProduction {
    id: string;
    machine: IMachine;
    date: Date;
    currentValue: number;
    yellowTarget: number;
    greenTarget: number;
    maxTarget: number;
}