import { useState } from "react"
import { IGaugeTextProps } from "../canvasComponents/lib/IGaugeTextProps"
import { IGaugeValues } from "../canvasComponents/lib/IGaugeValues"
import { Box, ButtonGroup, Button, Stack, Switch, FormControl, FormGroup, FormControlLabel, TextField, InputAdornment, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { DoubleGaugeV1 } from "../canvasComponents/DoubleGaugeV1"
import { DoubleGaugeV2 } from "../canvasComponents/DoubleGaugeV2"
import { SingleGauge } from "../canvasComponents/SingleGauge"
import { AltGauge_1 } from "../canvasComponents/AltGauge_1"
import { AltGauge_3 } from "../canvasComponents/AltGauge_3"
import { AltGauge_2 } from "../canvasComponents/AltGauge_2"

type GaugeTypes = "single" | "v1" | "v2" | "alt1" | "alt2" | "alt3";

interface IProps {
    gaugeType: GaugeTypes,
    title: string;
}

type FormValues = {
    yellowTarget: number;
    greenTarget: number;
    maxTarget: number;
    value: number;

    name: string;
    incrementValue: number;
    incrementSpeed: number;
}

const initMainGaugeValues: IGaugeValues = {
    yellowTarget: 500,
    greenTarget: 1500,
    maxTarget: 3000,
    value: 0,
}

const initSubGaugeValues: IGaugeValues = {
    yellowTarget: initMainGaugeValues.yellowTarget / 4,
    greenTarget: initMainGaugeValues.greenTarget / 4,
    maxTarget: initMainGaugeValues.maxTarget / 4,
    value: 0,
}

const initTextProps: IGaugeTextProps = {
    name: "",
    includeHeader: true,
    includeTargets: true,
    includeValue: true
}
const initSpeed = 25;
const initIncrementValue = 1;

const initFormValues: FormValues = {
    yellowTarget: initMainGaugeValues.yellowTarget,
    greenTarget: initMainGaugeValues.greenTarget,
    maxTarget: initMainGaugeValues.maxTarget,
    value: initMainGaugeValues.value,

    name: initTextProps.name,
    incrementSpeed: initSpeed,
    incrementValue: initIncrementValue,
}

const createSubTargets = (mainValues: IGaugeValues): IGaugeValues => {
    return {
        yellowTarget: mainValues.yellowTarget / 4,
        greenTarget: mainValues.greenTarget / 4,
        maxTarget: mainValues.maxTarget / 4,
        value: 0,
    }
}



export const GaugeDemo = ({gaugeType, title }: IProps) => {

    initTextProps.name = title;
    initFormValues.name = title;

    const { register, handleSubmit, reset, setValue} = useForm<FormValues>({
        defaultValues: initFormValues
    })

    const [autoId, setAutoId] = useState<NodeJS.Timer | undefined>();
    const [incrementValue, setIncrementValue] = useState<number>(initIncrementValue);
    const [incrementSpeed, setIncrementSpeed] = useState<number>(initSpeed);
    const [textProps, setTextProps] = useState<IGaugeTextProps>(initTextProps);
    const [mainGaugeValues, setMainGaugeValues] = useState<IGaugeValues>(initMainGaugeValues);
    const [subGaugeValues, setSubGaugeValues] = useState<IGaugeValues>(initSubGaugeValues);
    const [showBorder, setShowBorder] = useState<boolean>(false)
    const [subtargetProgress, setSubtargetProgress] = useState<number>(1)
    const [subtargetProgressText, setSubtargetProgressText] = useState<string>("Working on sub target 1");

    const editValues = handleSubmit((data) => {

        const mainGaugeValues: IGaugeValues = {
            yellowTarget: data.yellowTarget,
            greenTarget: data.greenTarget,
            maxTarget: data.maxTarget,
            value: data.value,
        }

        stopAutoIncrement()

        setMainGaugeValues(mainGaugeValues);
        setSubGaugeValues(createSubTargets(mainGaugeValues));

        setIncrementValue(data.incrementValue);
        setIncrementSpeed(data.incrementSpeed);
        setTextProps({...textProps, name: data.name})
    });

    const resetValues = () => {

        stopAutoIncrement();

        setMainGaugeValues(initMainGaugeValues);
        setSubGaugeValues(initSubGaugeValues);

        setIncrementValue(initIncrementValue);
        setIncrementSpeed(initSpeed);
        setTextProps({...textProps, name: initTextProps.name});

        setSubtargetProgress(1);
        setSubtargetProgressText("Working on sub target 1");
        reset();
    }
    
    const increment = (v: 1 | -1 = 1) => {

        if (mainGaugeValues.value <= 0 && v === -1) return;

        const value = mainGaugeValues.value + (incrementValue * v);
        let subValue = subGaugeValues.value + (incrementValue * v);
        if (subValue < 0) subValue = 0;

        setValue("value", value)

        setMainGaugeValues({
            ...mainGaugeValues,
            value,
        });

        if ((subValue > (subGaugeValues.yellowTarget + (subGaugeValues.maxTarget / 2))) && subtargetProgress < 5) {
            setSubGaugeValues({
                ...subGaugeValues,
                value: 0,
            });
            setSubtargetProgress(subtargetProgress + 1);
            const targetText = subtargetProgress < 5 ? `Working on sub target ${subtargetProgress + 1}` : "All subtargets complete";
            setSubtargetProgressText(targetText)
            return
        };

        setSubGaugeValues({
            ...subGaugeValues,
            value: subValue,
        });
    };


    const startAutoIncrement = () => {

        let mainValue = mainGaugeValues.value;
        let subValue = subGaugeValues.value;
        let progress = subtargetProgress;

        const interval = setInterval(() => {
            // DEV :: increment function seems not wanting work in interval
            mainValue += incrementValue;
            subValue += incrementValue;
    
            setValue("value", mainValue)
    
            setMainGaugeValues({
                ...mainGaugeValues,
                value: mainValue,
            });
    
            if ((subValue > (subGaugeValues.yellowTarget + (subGaugeValues.maxTarget / 2))) && progress < 5) {

                subValue = 0;

                setSubtargetProgress(++progress);
                const targetText = progress < 5 ? `Working on sub target ${progress}` : "All subtargets complete";
                setSubtargetProgressText(targetText);
            };
    
            setSubGaugeValues({
                ...subGaugeValues,
                value: subValue,
            });

        }, incrementSpeed);
        setAutoId(interval);
    }

    const stopAutoIncrement = () => {
        clearInterval(autoId);
        setAutoId(undefined);
    }

    const setShowHeader = () => {
        setTextProps({
            ...textProps,
            includeHeader: !textProps.includeHeader
        });
    }

    const setShowTargetValues = () => {
        setTextProps({
            ...textProps,
            includeTargets: !textProps.includeTargets
        });
    }

    const setShowValue = () => {
        setTextProps({
            ...textProps,
            includeValue: !textProps.includeValue
        })
    }

    return (
        <Box sx={{
            height: "90vh",
            display: "grid",
            gridTemplateRows: "auto 50vh auto max-content ",
            gridTemplateColumns: "50vw auto max-content auto",
            m: 5, p: 5,
            bgcolor: "#ddd",
            borderRadius: 10
        }}>
            {gaugeType === "single" && (
                <SingleGauge textProps={textProps} values={mainGaugeValues}
                sx={{height: "100%", width: "100%", gridRow: 2, gridColumn: 1, border: (showBorder ? "2px solid black" : "none")}} />
            )}

            {gaugeType === "v1" && (
                <DoubleGaugeV1 textProps={textProps} mainValues={mainGaugeValues} subValues={subGaugeValues} 
                sx={{height: "100%", width: "100%", gridRow: 2, gridColumn: 1, border: (showBorder ? "2px solid black" : "none")}} />
            )}

            {gaugeType === "v2" && (
                <DoubleGaugeV2 textProps={textProps} mainValues={mainGaugeValues} subValues={subGaugeValues} 
                sx={{height: "100%", width: "100%", gridRow: 2, gridColumn: 1, border: (showBorder ? "2px solid black" : "none")}} />        
            )}

            {gaugeType === "alt1" && (
                <AltGauge_1 textProps={textProps} mainValues={mainGaugeValues} subValues={subGaugeValues}
                sx={{height: "100%", width: "100%", gridRow: 2, gridColumn: 1, border: (showBorder ? "2px solid black" : "none")}} />
            )}

            {gaugeType === "alt2" && (
                <AltGauge_2 textProps={textProps} mainValues={mainGaugeValues} subValues={subGaugeValues}
                sx={{height: "100%", width: "100%", gridRow: 2, gridColumn: 1, border: (showBorder ? "2px solid black" : "none")}} />
            )}
            
            {gaugeType === "alt3" && (
                <AltGauge_3 textProps={textProps} mainValues={mainGaugeValues} subValues={subGaugeValues}
                sx={{height: "100%", width: "100%", gridRow: 2, gridColumn: 1, border: (showBorder ? "2px solid black" : "none")}} />
            )}

            <Stack spacing={2} sx={{gridRow: 2, gridColumn: 3, minWidth: "30vw"}}>
                <Box 
                    component="form"
                    onSubmit={editValues}
                    sx={{
                        display: "grid",
                        gridTemplateRows: "auto max-content max-content",
                        gridTemplateColumns: "auto auto",
                        gridGap: 20,
                }}>
                    <Stack sx={{gridRow: 1, gridColumn: 1}} spacing={2}>
                        <TextField 
                            type="number"
                            variant="standard"
                            label="Mål Gul"
                            { ...register("yellowTarget", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Mål grønn"
                            { ...register("greenTarget", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Maks verdi"
                            { ...register("maxTarget", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Verdi"
                            { ...register("value", { valueAsNumber: true})} />

                    </Stack>
                    <Stack sx={{gridRow: 1, gridColumn: 2}} spacing={2}>
                        <TextField
                            type="text"
                            variant="standard"
                            label="Navn"
                            { ...register("name")} />
                        <TextField 
                            type="number"
                            variant="standard"
                            label="Økning"
                            { ...register("incrementValue", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="klokkehastighet"
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >ms</InputAdornment>
                            }}
                            {  ...register("incrementSpeed", {valueAsNumber: true})} />
                    </Stack>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        fullWidth
                        type="submit"
                        disabled={Boolean(autoId)}
                        sx={{gridRow: 2, gridColumn: "1/3"}}>
                    Sett verdier
                    </Button>

                    <Button 
                        variant="contained"
                        color="warning"
                        fullWidth
                        type="button"
                        onClick={resetValues}
                        sx={{gridRow: 3, gridColumn: "1/3"}} >
                        Reset
                    </Button>

                </Box>

                <FormControl component="fieldset">
                    <FormGroup sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <FormControlLabel 
                            label="Vis navn" 
                            labelPlacement="top" 
                            control={<Switch
                                checked={textProps.includeHeader} 
                                color="primary" 
                                size="medium" onChange={setShowHeader}/> }/>
                        <FormControlLabel 
                            label="Vis måltall" 
                            labelPlacement="top" 
                            control={<Switch
                                checked={textProps.includeTargets} 
                                color="primary" 
                                size="medium" onChange={setShowTargetValues}/> }/>
                        <FormControlLabel 
                            label="Vis verdi" 
                            labelPlacement="top" 
                            control={<Switch
                                checked={textProps.includeValue} 
                                color="primary" 
                                size="medium" onChange={setShowValue}/> }/>
                        <FormControlLabel 
                            label="Vis boks"
                            labelPlacement="top"
                            control={<Switch 
                                checked={showBorder}
                                color="primary"
                                size="medium"
                                onChange={() => setShowBorder(!showBorder)} /> }/> 
                    </FormGroup>
                </FormControl>
            </Stack>

            {(gaugeType !== "single" && gaugeType !== "alt1") && (
                <Box sx={{
                    gridRow: 3, gridColumn: 3,
                    display: "flex",
                    justifyContent: "center", alignItems: "center"
                }}>
                    <Typography variant="h5" component="div">
                        {subtargetProgressText}
                    </Typography>
                </Box>                
            )}


            <ButtonGroup variant="text" color="primary" sx={{gridColumn: "1/5", gridRow: 4, mt: 3}}>
                <Button fullWidth color="primary" onClick={() => increment()} disabled={Boolean(autoId)} >Increment</Button>
                <Button fullWidth color="secondary" onClick={() => increment(-1)} disabled={Boolean(autoId)}>Decrement</Button>
                <Button fullWidth color="success" onClick={startAutoIncrement} disabled={Boolean(autoId)}>Start Auto</Button>
                <Button fullWidth color="warning" onClick={stopAutoIncrement} disabled={Boolean(!autoId)}>Stop Auto</Button>
            </ButtonGroup>

        </Box>
    )}