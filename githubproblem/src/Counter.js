import { useState } from "react";
function Counter(){
    console.log(useState(1));
    let [stateCount, setStateCount] = useState(2);
    function increase(){
        setStateCount(stateCount+1);
        
    }
    function decrease(){
        setStateCount(stateCount-1);
        
    }
    function reset(){
        setStateCount(0);
    }
    

    return(
        <div>
            <h1>{stateCount}</h1>
            <button onClick={increase}>increase</button>
            <button onClick={decrease}>decrease</button>
            <button onClick={reset}>reset to zero</button>
            
            
        </div>
    )
}

export default Counter;