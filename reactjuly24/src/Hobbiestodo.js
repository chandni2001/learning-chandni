import { useState } from "react";

function Hobbiestodo(){
    let initialHobbies =["cook","Gym","HomeWork","eat"];
    let [todo, setHobbies] = useState(initialHobbies);
    let [hobbiesEnter,setHobbiesEntered] = useState("Enter the Hobbies");
    function changeHobbies(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        setHobbiesEntered(e.target.value);
    }

    function addHobbies(){
        let newTodoArr = [...todo,hobbiesEnter];
        setHobbies(newTodoArr);

    }

    function deleteHobbies(indexToDelete){
        let newHobbies = todo.filter(function (val,index){
            if (indexToDelete == index) return false;
            return true;
        });
        setHobbies(newHobbies);
    }

    function  removeAll(){
        let newList = [...todo];

        setHobbies(newList =[]);
    }
    return (
        <div className="myDiv"><input type="text" name="todoitem" value={hobbiesEnter} onChange = {changeHobbies} />

        
        <button onClick={addHobbies}>  Add Hobbies</button>
        
            {
                todo.map(function (val,index){
                    return <div>{val} <button onClick={function (){ deleteHobbies(index)}}> Delete the hobbies </button>
                    </div>
                })
            }

<button onClick={removeAll}>  Remove all  Hobbies</button>

        </div>
    );

}

export default Hobbiestodo;