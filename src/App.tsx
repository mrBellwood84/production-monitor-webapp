import { DoubleGaugeCanvas } from "./Views/CanvasComponents/DoubleGaugeCanvas";
import { IGaugeValues } from "./Views/CanvasComponents/lib/IGaugeProps";

export const App = () => {

    const height = 550;
    const width = 600;

    const gaugeValues: IGaugeValues = {
        minYellow: 200,
        minGreen: 500,
        max: 3000,
        value: 0,

        minYellowTop: 50,
        minGreenTop: 100,
        maxTop: 200,
        valueTop: 0
    }


    return (
        <DoubleGaugeCanvas id="canvas-test" height={height} width={width} values={gaugeValues} />
    )
}