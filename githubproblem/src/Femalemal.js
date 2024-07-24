import { useState, useEffect } from "react";
import axios from "axios";
function Femalemale(){
    let [valueEntered,setValueEntered] = useState("");
    function changeEntered(e){
        setValueEntered(e.target.value);
    }
    
    function showGender(data){
        axios.get(`https://api.genderize.io/?name=${data}`)
    .then(function(response){
        console.log(response.data.gender)
        //setValueEntered(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
};
    return (
        <div className="Gender"><input type="text" name="todoitem" value={valueEntered} onChange = {changeEntered} />
        <br>
        </br>
        <button onClick={function(){
            showGender(valueEntered);
        }}>Show Gender</button>

        </div>
    )
}

export default Femalemale;