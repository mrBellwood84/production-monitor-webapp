import { TabPanelUnstyled } from "@mui/base";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { createMachineData } from "../../MockData/macines";
import { IMachine } from "../../Models/Machine/IMachine";
import { DoubleGaugeCanvas } from "../CanvasComponents/DoubleGaugeCanvas";
import { IGaugeValues } from "../CanvasComponents/lib/IGaugeValues";

const extractValues = (m: IMachine): IGaugeValues => {
    let obj: IGaugeValues = {
        minYellow: m.productionDayTarget.minYellow,
        minGreen: m.productionDayTarget.minGreen,
        max: m.productionDayTarget.max,
        value: 0,

        minYellowTop: m.productionSubDayTargets[0].minYellow,
        minGreenTop: m.productionSubDayTargets[0].minGreen,
        maxTop: m.productionSubDayTargets[0].max,
        valueTop: 0,
    }

    return obj;
}

export const GarmentHangupDemo = () => {

    const [machineData, setMachineData] = useState<IMachine[]>();

    useEffect(() => {
        const doSettMachineData = () => {
            if (machineData) return;
            const data = createMachineData();
            setMachineData(data);
        }

        doSettMachineData();
    },[machineData])

    if (!machineData) return <div>Loading</div>;

    return (
        <Box sx={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
        }}>

            <Box sx={{
                height: "10vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Typography variant="h4" component="div" sx={{
                    fontWeight: 400,
                }}>
                    Demo - Produksjonsoversikt Daglig
                </Typography>
            </Box>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, calc(100vw / 3))",
                gridTemplateRows: "repeat(2, 35vh)",
                maxHeight: "70vh",
                widht: "inherit",
            }}>
                {machineData && machineData.map(x => ( 
                    <DoubleGaugeCanvas key={x.id} name={x.name} values={extractValues(x)} />
                ))}
            </Box>

            <Box sx={{
                height: "20vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography variant="h2" component="div" sx={{
                    fontWeight: 400,
                }}>
                    Produsert: 0 | Prosent: 0%
                </Typography>
            </Box>
        </Box>
    )

}