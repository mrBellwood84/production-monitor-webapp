import { IMachine } from "../Models/Machine/IMachine";
import { v4 as genId } from "uuid";
import { IProductionDayTarget } from "../Models/Machine/IProductionDayTarget";
import { IProductionDaySubTarget } from "../Models/Machine/IProductionDaySubTarget";


const dayTarget: IProductionDayTarget = {
    id: genId(),
    minYellow: 1900,
    minGreen: 2300,
    max: 3600,
}

const createSubTargets = () => {
    let arr: IProductionDaySubTarget[] = [];

    for (let i = 7; i < 15; i += 2) {
        let obj: IProductionDaySubTarget = {
            id: genId(),
            timeStart: new Date(2000, 0, 0, i),
            timeEnd: new Date(2000, 0, 0, i + 2),
            minYellow: i === 9 ? 200 : 300,
            minGreen: i === 9 ? 300 : 400,
            max: i === 9 ? 800 : 1000,
        }

        arr.push(obj);
    }

    return arr;
}


export const createMachineData = (): IMachine[] => {

    let arr: IMachine[] = [];

    let subTargets = createSubTargets();

    for (let i = 0; i < 6; i++) {
        let obj: IMachine = {
            id: genId(),
            name: `Stasjon ${i+1}`,
            type: {
                id: genId(),
                name: "GarmentHangupStation",
            },
            productionDayTarget: dayTarget,
            productionSubDayTargets: subTargets,
        }
        arr.push(obj);
    }

    return arr;
}