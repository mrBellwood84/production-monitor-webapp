import { useState } from "react"
import { SingleGauge } from "../CanvasComponents/SingleGauge"
import { IGaugeTextProps } from "../CanvasComponents/lib/IGaugeTextProps"
import { IGaugeValues } from "../CanvasComponents/lib/IGaugeValues"
import { Box, ButtonGroup, Button, Stack, Switch, FormControl, FormGroup, FormControlLabel, TextField, InputAdornment } from "@mui/material"
import { useForm } from "react-hook-form"

type FormValues = {
    yellowTarget: number;
    greenTarget: number;
    maxTarget: number;
    value: number;

    name: string;
    incrementValue: number;
    incrementSpeed: number;
}

const initGaugeValues: IGaugeValues = {
    yellowTarget: 500,
    greenTarget: 1500,
    maxTarget: 3000,
    value: 0,
}
const initTextProps: IGaugeTextProps = {
    name: "Single Gauge Demo",
    includeHeader: true,
    includeTargets: true,
    includeValue: true
}
const initSpeed = 200;
const initIncrementValue = 25;

const initFormValues: FormValues = {
    ...initGaugeValues,
    name: initTextProps.name,
    incrementSpeed: initSpeed,
    incrementValue: initIncrementValue,
}

export const SingleGaugeDemo = () => {

    const { register, handleSubmit, reset, setValue} = useForm<FormValues>({
        defaultValues: initFormValues
    });


    const [autoId, setAutoId] = useState<NodeJS.Timer | undefined>();
    const [incrementValue, setIncrementValue] = useState<number>(initIncrementValue);
    const [incrementSpeed, setIncrementSpeed] = useState<number>(initSpeed);
    const [textProps, setTextProps] = useState<IGaugeTextProps>(initTextProps);
    const [gaugeValues, setGaugeValues] = useState<IGaugeValues>(initGaugeValues)
    const [showBorder, setShowBorder] = useState<boolean>(false);

    const editValues = handleSubmit((data) => {
        stopAutoIncrement()
        setGaugeValues({...data});
        setIncrementValue(data.incrementValue);
        setIncrementSpeed(data.incrementSpeed);
        setTextProps({...textProps, name: data.name})
    });

    const resetValues = () => {
        stopAutoIncrement();
        setGaugeValues(initGaugeValues);
        setIncrementValue(initIncrementValue)
        setIncrementSpeed(initSpeed)
        setTextProps({...textProps, name: initTextProps.name});
        reset();
    }
    
    const increment = (v: 1 | -1 = 1) => {

        if (gaugeValues.value <= 0 && v === -1) return;

        const value = gaugeValues.value + (incrementValue * v);
        setValue("value", value)
        setGaugeValues({
            ...gaugeValues,
            value,
        });
    }


    const startAutoIncrement = () => {
        let value = gaugeValues.value;
        const interval = setInterval(() => {
            // DEV :: increment function seems not wanting work in interval
            value += incrementValue;
            setGaugeValues({
                ...gaugeValues,
                value,
            });
            setValue("value", value);
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
            <SingleGauge textProps={textProps} values={gaugeValues} 
            sx={{height: "100%", width: "100%", gridRow: 2, gridColumn: 1, border: (showBorder ? "2px solid black" : "none")}} />

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

            <ButtonGroup variant="text" color="primary" sx={{gridColumn: "1/5", gridRow: 4, mt: 3}}>
                <Button fullWidth color="primary" onClick={() => increment()} disabled={Boolean(autoId)} >Increment</Button>
                <Button fullWidth color="secondary" onClick={() => increment(-1)} disabled={Boolean(autoId)}>Decrement</Button>
                <Button fullWidth color="success" onClick={startAutoIncrement} disabled={Boolean(autoId)}>Start Auto</Button>
                <Button fullWidth color="warning" onClick={stopAutoIncrement} disabled={Boolean(!autoId)}>Stop Auto</Button>
            </ButtonGroup>

        </Box>
    )
}