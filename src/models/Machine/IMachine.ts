import { IMachineType } from "./IMachineType";
import { IProductionDaySubTarget } from "./IProductionDaySubTarget";
import { IProductionDayTarget } from "./IProductionDayTarget";


export interface IMachine {
    id: string;
    name: string;
    type: IMachineType;
    productionDayTarget: IProductionDayTarget;
    productionSubDayTargets: IProductionDaySubTarget[];
}