import { Button, ButtonGroup, Container, Stack } from "@mui/material";
import { SetStateAction, useState } from "react"
import { Gauge } from "../Graph/Gauge/Gauge";
import { IGaugeValues } from "../Graph/Gauge/lib/IGaugeValues"

interface Interval {
    key: string;
    timerId: NodeJS.Timer;
}

export const GaugeDemo = () => {

    const [gauge1, setGauge1] = useState<IGaugeValues>({min: 0, max: 1500, count: 0});
    const [gauge2, setGauge2] = useState<IGaugeValues>({...gauge1});
    const [gauge3, setGauge3] = useState<IGaugeValues>({...gauge1});
    const [timers, setTimers] = useState<Interval[]>([])

    const changeGaugeValue = (
        hook: IGaugeValues,
        dispatch: React.Dispatch<SetStateAction<IGaugeValues>>,
        changeValue: number,
    ) => {
        dispatch({
            ...hook,
            count: hook.count + changeValue
        })
    }

    const autoGaugeValues = (
        gaugeName: string,
        values: IGaugeValues,
        dispatch: React.Dispatch<SetStateAction<IGaugeValues>>,
    ) => {
        const interval: Interval = {
            key: gaugeName,
            timerId: setInterval(() => {
                dispatch({
                    ...values,
                    count: values.count += 1,
                });
            }, 100),
        };

        let newTimers = [...timers];
        newTimers.push(interval);
        setTimers(newTimers);
    }

    const resetGauge = (
        gaugeName: string,
        values: IGaugeValues,
        dispatch: React.Dispatch<SetStateAction<IGaugeValues>>,
    ) => {

        const timer = timers.find(x => x.key === gaugeName);
        clearInterval(timer?.timerId);
        const newTimers = timers.filter(x => x !== timer)
        setTimers(newTimers);

        dispatch({
            ...values,
            count: 0,
        })
    }

    return (
        <Container sx={{mt: 2}}>

            <Stack direction="row" spacing={2} alignItems="baseline" justifyContent="space-evenly">

                <Stack direction="column" spacing={1} alignItems="center" justifyContent="flex-end">
                    <Gauge height={200} width={300} skew={-1} values={gauge1} />
                    <ButtonGroup variant="text" size="small">
                        <Button onClick={() => changeGaugeValue(gauge1, setGauge1, -100)}>Decrement</Button>
                        <Button onClick={() => changeGaugeValue(gauge1, setGauge1, 100)}>Increment</Button>
                        <Button onClick={() => autoGaugeValues("g1", gauge1, setGauge1)}>Auto</Button>
                        <Button onClick={() => resetGauge("g1", gauge1, setGauge1)}>Reset</Button>
                    </ButtonGroup>
                </Stack>

                <Stack direction="column" spacing={1} alignItems="center" justifyContent="flex-end">
                    <Gauge height={200} width={300} skew={0} values={gauge2} />
                    <ButtonGroup variant="text" size="small">
                        <Button onClick={() => changeGaugeValue(gauge2, setGauge2, -100)}>Decrement</Button>
                        <Button onClick={() => changeGaugeValue(gauge2, setGauge2, 100)}>Increment</Button>
                        <Button onClick={() => autoGaugeValues("g2", gauge2, setGauge2)}>Auto</Button>
                        <Button onClick={() => resetGauge("g2", gauge2, setGauge2)}>Reset</Button>
                    </ButtonGroup>
                </Stack>

                <Stack direction="column" spacing={1} alignItems="center" justifyContent="flex-end">
                    <Gauge height={200} width={300} skew={1} values={gauge3} />
                    <ButtonGroup variant="text" size="small">
                        <Button onClick={() => changeGaugeValue(gauge3, setGauge3, -100)}>Decrement</Button>
                        <Button onClick={() => changeGaugeValue(gauge3, setGauge3, 100)}>Increment</Button>
                        <Button onClick={() => autoGaugeValues("g3", gauge3, setGauge3)}>Auto</Button>
                        <Button onClick={() => resetGauge("g3", gauge3, setGauge3)}>Reset</Button>
                    </ButtonGroup>
                </Stack>
                

            </Stack>
        </Container>
    )
}