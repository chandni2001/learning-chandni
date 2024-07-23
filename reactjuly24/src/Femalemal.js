import { useState, useEffect } from "react";
import axios from "axios";
function Femalemale(){
    let [valueEntered,setValueEntered] = useState("defalut female");
    function changeEntered(e){
        
        setValueEntered(e.target.value);
    }
    
    function showGender(){
        axios.get("https://api.genderize.io/?name")
    .then(function(response){
        console.log(response.data)
        setValueEntered(response.data);
    })

    
    .catch(function(error){
        console.log(error);
    });
};
    return (
        <div className="Gender"><input type="text" name="todoitem" value={valueEntered} onChange = {changeEntered} />
        <br>
        </br>
        <button onClick={showGender}>Show Gender</button>
        </div>
    )
}

export default Femalemale;