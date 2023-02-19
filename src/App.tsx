// function App() {

//     const [values, setValues] = useState<IGaugeValues>()

//     const gaugeSkew = 0;

//     const changeValue = (value: number) => {
//         if (!values) return
//         const newVal: IGaugeValues = {
//             ...values,
//             count: values.count += value,
//         }

//         setValues(newVal)
//     }

//     useEffect(() => {
//         const setGaugeValues = () => {
//             const gv: IGaugeValues = {
//                 min: 0,
//                 max: 150,
//                 count: 0,
//             }
//             setValues(gv);
//         }
//         setGaugeValues();
//     },[setValues])

//   return (
//     <div className="App">
//         {values && (
//             <Fragment>
//             <Gauge height={250} width={400} skew={0} values={values} />
//             <Gauge height={200} width={400} skew={-1} values={values} />
//             <Gauge height={300} width={400} skew={1} values={values} />
//             </Fragment>
//         )}
//         <br/>
//         <Button onClick={() => changeValue(5)}>Increment</Button>
//         <Button onClick={() => changeValue(-5)}>Decrement</Button>
//     </div>
//   );
// }

// export default App;

export const App = () => {



    return <div>no content</div>
}