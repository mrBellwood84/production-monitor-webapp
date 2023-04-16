export default null
// import { Box, Typography } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../Store/hooks";
// import { DoubleGaugeCanvas } from "../CanvasComponents/DoubleGaugeCanvas";
// import { IGaugeValues } from "../CanvasComponents/lib/IGaugeValues"
// import { IProduction } from "../../Models/Production/IProduction";
// import { LoadingPage } from "../Loadingpage";
// import { ConnectionErrorPage } from "../ConnectionErrorPage";

// export const GarmentHangupDemo = () => {

//     const dispatch = useAppDispatch();
//     const data = useAppSelector(state => state.productionStore);

//     const createGaugeValues = (data: IProduction): IGaugeValues => {
//         return {
//             machineName: data.machine.displayName,
//             yellowTarget: data.yellowTarget,
//             greenTarget: data.greenTarget,
//             maxTarget: data.maxTarget,
//             value: data.currentValue,
//         }
//     }

//     if (data.loadError) return <ConnectionErrorPage />
//     if (!data.dataLoaded) return <LoadingPage />

//     return (
//         <Box sx={{
//             height: "100vh",
//             width: "100vw",
//             overflow: "hidden",
//         }}>
//             <Box sx={{
//                 height: "15vh",
//                 width: "100vw",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center"
//             }}>
//                 <Typography variant="h3" component="div" sx={{
//                     fontWeight: 400,
//                 }}>
//                     Demo - Produksjonsoversikt Daglig
//                 </Typography>
//             </Box>

//             <Box sx={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, calc(100vw / 3))",
//                 gridTemplateRows: "repeat(2, 35vh)",
//                 maxHeight: "70vh",
//                 widht: "inherit",
//             }}>
//                 {data.data.map(x => (
//                     <DoubleGaugeCanvas
//                         key={x.id}
//                         name={x.machine.displayName}
//                         values={createGaugeValues(x)} />
//                 ))}
//             </Box>

//             <Box sx={{
//                 height: "15vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}>
//                 <Typography variant="h4" component="div">
//                     Produsert: {data.valueTotal}/{data.greenTargetTotal} | {data.percentValue}%
//                 </Typography>

//             </Box>
//         </Box>
//     )

// }