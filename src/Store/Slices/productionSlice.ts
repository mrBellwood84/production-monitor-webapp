import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduction } from "../../Models/Production/IProduction";
import { IProductionUpdateDTO } from "../../Models/Production/IProductionUpdateDTO";

interface IProductionState {
    data: IProduction[];
    dataLoaded: boolean;
    loadError: boolean;
    socketConnected: boolean;
    valueTotal: number;
    greenTargetTotal: number;
    percentValue: number;
    
}

const initialState: IProductionState = {
    data: [],
    dataLoaded: false,
    loadError: false,
    socketConnected: false,
    valueTotal: 0,
    greenTargetTotal: 0,
    percentValue: 0,
}

export const productionSlice = createSlice({
    name: "Production",
    initialState,
    reducers: {
        setLoadedData: (state, action: PayloadAction<IProduction[]>) => {            
            const total = action.payload.reduce((acc, item) => { return acc + item.currentValue}, 0);
            const target = action.payload.reduce((acc, item) => { return acc + item.greenTarget}, 0)
            const percent = (target / 100) * total;

            state.data = action.payload;
            state.dataLoaded = true;
            state.loadError = false;
            state.valueTotal = total;
            state.greenTargetTotal = target;
            state.percentValue = percent;
        },

        setLoadError: (state, action: PayloadAction<boolean>) => {
            state.loadError = action.payload;
        },

        setSocketConnected: (state, action: PayloadAction<boolean>) => {
            state.socketConnected = action.payload;
        },

        incrementCounter: (state, action: PayloadAction<IProductionUpdateDTO>) => {
            
            if (!state.dataLoaded) return;

            const data = state.data.map(x => {
                if (x.machine.id === action.payload.machineId) x.currentValue = action.payload.value;
                return x;
            });

            const total = data.reduce((acc, item) => { return acc + item.currentValue}, 0);
            const target = data.reduce((acc, item) => { return acc + item.greenTarget}, 0)
            const percent = Math.round((total / target) * 100);

            state.data = data;
            state.dataLoaded = true;
            state.valueTotal = total;
            state.greenTargetTotal = target;
            state.percentValue = percent;

            
        }
    }
})