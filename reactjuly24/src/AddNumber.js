import { useState } from "react";

function AddNumber(){
    let [num1,setNum1] = useState(0);
    let [num2,setNum2] = useState(0);
    let [addnum,setAddNum] = useState(0);
    function changeNumber1(e){
        setNum1(e.target.value);

    }
    function changeNumber2(e){
        setNum2(e.target.value);

    }


    function addNum(){
        let sum = Number(num1)+Number(num2);
        setAddNum(sum);

    }
    return (
        <div className="AddNumber">
            <input  type="text"  name="num1" value={num1}  onChange={changeNumber1}/><br></br>
            <input type="text"  name="num2" value={num2} onChange={changeNumber2}/><br></br>
            <button onClick={addNum}  >Add numbers</button>
            <h1>{addnum}</h1>
        </div>
    )
}

export default AddNumber;