import { useEffect, useRef } from "react";
import { rootAgent } from "../../apiAgent/rootAgent";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { productionSlice } from "../../store/slices/productionSlice";
import { IProduction } from "../../models/production/IProduction";

export const GarmentDataLoader = () => {

    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.productionStore);
    const interval = useRef<NodeJS.Timer>();
    const singleLoad = useRef<boolean>(false)

    useEffect(() => {
        const loadData = async (reload: boolean = false) => {
            if (singleLoad.current && !reload) return
            singleLoad.current = true;
            try {
                let response = await rootAgent.get("https://localhost:7031/api/production")
                if (response.ok) {
                    const body: IProduction[] = await response.json();
                    dispatch(productionSlice.actions.setLoadedData(body));
                } else {
                    console.error("Could not connect to api: " + response.status)
                    dispatch(productionSlice.actions.setLoadError(true));
                }
            } catch (ex) {
                console.error("Could not connect to api!");
                dispatch(productionSlice.actions.setLoadError(true));
            }
        }

        loadData();

        if (data.loadError && !interval.current) {
            interval.current = setInterval(() => {
                dispatch(productionSlice.actions.setLoadError(false));
                if (data.dataLoaded) clearInterval(interval.current)
                loadData(true)
            }, 30000)
        }
    })

    return null;
}