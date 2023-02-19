import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Gauge } from './Views/Graph/Gauge/Gauge';
import { IGaugeValues } from './Views/Graph/Gauge/lib/IGaugeValues';

function App() {

    const [values, setValues] = useState<IGaugeValues>()

    const gaugeSkew = 0;

    const changeValue = (value: number) => {
        if (!values) return
        const newVal: IGaugeValues = {
            ...values,
            count: values.count += value,
        }

        setValues(newVal)
    }

    useEffect(() => {
        const setGaugeValues = () => {
            const gv: IGaugeValues = {
                min: 0,
                max: 100,
                count: 0,
            }
            setValues(gv);
        }
        setGaugeValues();
    },[setValues])

  return (
    <div className="App">
        {values && (
            <Gauge height={300} width={400} skew={gaugeSkew} values={values} />
        )}
        <br/>
        <Button onClick={() => changeValue(5)}>Increment</Button>
        <Button onClick={() => changeValue(-5)}>Decrement</Button>
    </div>
  );
}

export default App;
