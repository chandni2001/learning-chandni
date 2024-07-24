import { useState } from "react";

function SinCosTan(){
    let [num,setNum] = useState(0);
    let [sinevalue,setvalue] = useState(0);
   

    
    function changeNumber1(e){
        setNum(e.target.value);

    }
    


    function valueOfSine(){
        
        setvalue(Math.sin(num));

    }
    function valueOfCose(){
        
        setvalue(Math.cos(num));

    }
    function valueOfTan(){
        
        setvalue(Math.tan(num));

    }
    return (
        <div className="AddNumber">
            <input  type="text"  name="degree" onChange={changeNumber1}/><br></br>
            
            <button onClick={valueOfSine}  >Sine  Value</button><br></br>
            <button onClick={valueOfCose}  >Cose Value</button><br></br>
            <button onClick={valueOfTan}  >Tan Value</button><br></br>
            <h1>{sinevalue}</h1>
        </div>
    )
}

export default SinCosTan;