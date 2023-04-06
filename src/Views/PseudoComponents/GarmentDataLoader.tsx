import { useEffect } from "react";
import { rootAgent } from "../../ApiAgent/rootAgent";
import { useAppDispatch, useAppSelector } from "../../Store/hooks"
import { productionSlice } from "../../Store/Slices/productionSlice";
import { IProduction } from "../../Models/Production/IProduction";

export const GarmentDataLoader = () => {

    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.productionStore);

    useEffect(() => {
        if (data.dataLoaded) return;
        const loadData = async () => {
            let response = await rootAgent.get("https://localhost:7031/api/production")
            if (response.ok) {
                const body: IProduction[] = await response.json();
                dispatch(productionSlice.actions.setLoadedData(body));
            } else {
                console.error("Could not connect to api: " + response.status)
            }
        }
        loadData();
    })

    return <div>Api loading</div>
}