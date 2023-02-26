import { Box,  Button,  ButtonGroup,  Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DoubleGaugeCanvas } from "../CanvasComponents/DoubleGaugeCanvas";
import { IGaugeValues } from "../CanvasComponents/lib/IGaugeProps";


type FormValues = {
    minYellow: number,
    minGreen: number,
    max: number,
    value: number,

    minYellowTop: number,
    minGreenTop: number,
    maxTop: number,
    valueTop: number,
    speed: number,

    increment: number,
}

export const DoubleGaugeDemo = () => {
    const gaugeValues: IGaugeValues = {
        minYellow: 1600,
        minGreen: 2400,
        max: 3400,
        value: 0,

        minYellowTop: 400,
        minGreenTop: 600,
        maxTop: 800,
        valueTop: 0
    }

    const { register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            ...gaugeValues,
            increment: 10,
            speed: 1000,
        }
    })

    const [values, setValues] = useState<IGaugeValues>(gaugeValues);
    const [incrementValue, setIncrementValue] = useState<number>(10);
    const [speed, setSpeed] = useState<number>(1000);
    const [autoId, setAutoId] = useState<NodeJS.Timer | undefined>(undefined);

    const editValues = handleSubmit((data) => {
        
        stopAutoIncrement();
        setValues({...data})
        setIncrementValue(data.increment);
        setSpeed(data.speed);
    });

    const resetValues = () => {
        stopAutoIncrement();
        setValues(gaugeValues);
        setIncrementValue(incrementValue)
        setSpeed(speed);
        reset();
    }

    const incrementor = (v: 1 | -1) => {
        if (v === 1) {
            setValues({
                ...values, 
                value: values.value += incrementValue,
                valueTop: values.valueTop! += incrementValue,
            });
            return
        }
        setValues({
            ...values, 
            value: (values.value - incrementValue) < 0 ? 0 : (values.value - incrementValue),
            valueTop: (values.valueTop! - incrementValue) < 0 ? 0 :(values.valueTop! - incrementValue),
        });    
    }

    const startAutoIncrement = () => {
        const interval = setInterval(() => {
            incrementor(1);
        }, speed);
        setAutoId(interval);
    }

    const stopAutoIncrement = () => {
        console.log(autoId)
        clearInterval(autoId);
        setAutoId(undefined);
    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "50vh auto",
            gridTemplateColumns: "50vw auto",
            m: 5,
        }}>
            <DoubleGaugeCanvas id="test" values={values} name="Maskin 1 Test" />
            
            <Stack 
                component="form"
                onSubmit={editValues}
                direction="column" 
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{m: 5}} >

                <Stack direction="row" spacing={2}>
                    <Stack direction="column" spacing={1}>
                        <TextField
                            type="number"
                            variant="standard"
                            label="Minimum Gul"
                            {...register("minYellow", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Minimum Grønn"
                            {...register("minGreen", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Maksimum Verdi"
                            {...register("max", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Start Verdi"
                            {...register("value", {valueAsNumber: true})} />
                    </Stack>

                    <Stack direction="column" spacing={1}>
                    <TextField
                            type="number"
                            variant="standard"
                            label="Minimum Gul Topp"
                            {...register("minYellowTop", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Minimum Grønn Topp"
                            {...register("minGreenTop", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Maksimum Verdi Topp"
                            {...register("maxTop", {valueAsNumber: true})} />
                        <TextField
                            type="number"
                            variant="standard"
                            label="Start Verdi Topp"
                            {...register("valueTop", {valueAsNumber: true})} />
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={3}>
                    <TextField 
                        type="number"
                        variant="standard"
                        label="Økning"
                        {...register("increment", {valueAsNumber: true})} />
                    <TextField 
                        disabled={Boolean(autoId)}
                        type="number"
                        variant="standard"
                        label="Hastighet (ms per tick)"
                        {...register("speed", {valueAsNumber: true})} />
                </Stack>
                
                <Button type="submit" variant="contained" color="secondary" fullWidth>Endre</Button>
                <Button type="button" variant="contained" color="warning" fullWidth onClick={resetValues}>Reset</Button>
            </Stack>

            <ButtonGroup variant="text" color="primary" sx={{gridColumn: "1/3", gridRow: 2, mt: 5}}>
                <Button fullWidth color="primary" onClick={() => incrementor(1)} disabled={Boolean(autoId)}>Increment</Button>
                <Button fullWidth color="info" onClick={() => incrementor(-1)} disabled={Boolean(autoId)}>Decrement</Button>
                <Button fullWidth color="success" onClick={startAutoIncrement} disabled={Boolean(autoId)}>Start Auto</Button>
                <Button fullWidth color="warning" onClick={stopAutoIncrement} disabled={Boolean(!autoId)}>End Auto</Button>
            </ButtonGroup>

        </Box>
    )
}