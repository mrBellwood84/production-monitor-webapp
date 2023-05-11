import { Box, Typography } from "@mui/material"
import { GarmentDataLoader } from "../_pseudoComponents/GarmentDataLoader"
import { GarmentSignalRConnection } from "../_pseudoComponents/GarmentSignalRConnection"
import { useAppSelector } from "../../_store/hooks"
import { ConnectionErrorPage } from "../ConnectionErrorPage"
import { Fragment } from "react"
import { IProduction } from "../../_models/_production/IProduction"
import { IGaugeTextProps } from "../_canvasComponents/_lib/IGaugeTextProps"
import { IGaugeValues } from "../_canvasComponents/_lib/IGaugeValues"
import { LoadingPage } from "../Loadingpage"
import { DoubleGaugeV1 } from "../_canvasComponents/DoubleGaugeV1"
import { DoubleGaugeV2 } from "../_canvasComponents/DoubleGaugeV2"
import { SingleGauge } from "../_canvasComponents/SingleGauge"

interface IProps {
    type: "single" | "v1" | "v2" | string
}

const headerProvider = (type: string ) => {
    switch (type) {
        case "single":
            return "Single Gauge Demo";
        case "v1":
            return "Double Gauge V1 Demo"
        case "v2": 
            return "Double Gauge V2 Demo"
        default:
            return "Gauge Demo, no variant set"
    }
}



const provideGauge = (type: string, data: IProduction) => {

    const textProps: IGaugeTextProps = {
        name: data.machine.displayName,
        includeHeader: true,
        includeTargets: true,
        includeValue: true,
    }

    const mainValues: IGaugeValues = {
        yellowTarget: data.yellowTarget,
        greenTarget: data.greenTarget,
        maxTarget: data.maxTarget,
        value: data.currentValue,
    }

    const subValues: IGaugeValues = {
        yellowTarget: data.yellowTarget / 4,
        greenTarget: data.greenTarget / 4,
        maxTarget: data.maxTarget / 4,
        value: data.currentValue,
    }

    switch(type) {
        case "single":
            return <SingleGauge textProps={textProps} values={mainValues} sx={{m:2}} />
        case "v1":
            return <DoubleGaugeV1 textProps={textProps} mainValues={mainValues} subValues={subValues} sx={{m:0}} />
        case "v2":
            return <DoubleGaugeV2 textProps={textProps} mainValues={mainValues} subValues={subValues} sx={{m:1}} />
        default:
            return undefined;
    }
}

export const ProductionDemo = ({ type }: IProps) => {

    const data = useAppSelector(state => state.productionStore)

    if (data.loadError) return <ConnectionErrorPage />
    if (!data.dataLoaded) {
        return (
            <Fragment>
                <GarmentSignalRConnection />
                <GarmentDataLoader />
                <LoadingPage />
            </Fragment>
        )
    }


    return (
        <Box sx={{
            height: "100vh",
            width: "100vw-",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>


            <Box sx={{
                height: "95%",
                width: "95%",
                bgcolor: "#ddd",
                borderRadius: 5,
                p: 5,
                display: "grid",
                gridTemplateRows: "10% repeat(2, 40%) 10%",
                gridTemplateColumns: "repeat(3, calc((100%) / 3))"
            }}>
                <Typography variant="h3" component="div" sx={{
                    fontWeight: 600, 
                    gridRow: 1, 
                    gridColumn: "1 / 4",
                    textAlign: "center",
                    m: 2,
                    color: "#333",
                    textShadow: "1px 1px 2px #555"
                }}>
                    {headerProvider(type)}
                </Typography>

                {data.data.map(x => provideGauge(type, x))}

                <Box sx={{
                    gridRow: 4, gridColumn: "1 / 4",
                    display: "flex",
                    justifyContent: "center", alignItems: "end"
                }}>
                    <Typography variant="h4" component="div" sx={{m: 1, fontWeight: 500, textShadow: "1px 1px 2px #555", color: "#333"}}>
                        Produsert: {data.valueTotal} / {data.greenTargetTotal} | {data.percentValue}%
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}