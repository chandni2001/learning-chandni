import { useState, useMemo } from "react";
const UseMemoHookExample = ()=>{
    const [increment, setIncrement]=useState(0);
    const [initialVal, setInitialVal]=useState(0);
    console.log("component functtion called again");
    const complexCalculation=(nul=1)=>{
        console.log(`initial sum value ${nul}`);
        for(let i=1;i<4;i++){
            nul=nul*i;
            console.log("ran");
        }
        console.log("nul calculated again=",nul);
        return nul;
    };
    const increase=()=>{
        setIncrement(increment+1);
    };

    const increaseInitialVal=()=>{
        setInitialVal(initialVal+1);
    };

    const optimizedComplexCalculation=useMemo(()=>complexCalculation(initialVal),[initialVal]);
    // const optimizedComplexCalculation1=complexCalculation(2);

    return (
        <div>
            <button onClick={increase}>Increament</button>
            <div>{increment}</div>
            <br/>
            <button onClick={increaseInitialVal}>Increase initial val</button>
            <div>Initial val={initialVal}</div>
            <p>value={optimizedComplexCalculation}</p>
        </div>
    );
}

export default UseMemoHookExample;