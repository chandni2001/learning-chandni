import { useState, useEffect } from "react";
import axios from "axios";

function Todo(){
    let todoInitialValue =[{name:"Default name", status:"default staus"}];
    let [todo, setTodos] = useState(todoInitialValue);
    let [todoEnters,setTodoEntered] = useState("Default Todo");
    let [statusEnters,setStatusEntered] = useState("Default status");
    useEffect(function(){
        console.log("function called on load");
        getTodos();
    },[]);
        
        function changeTodoEntered(e){
            console.log(e);
            console.log(e.target);
            console.group(e.target.value);
            setTodoEntered(e.target.value);
        }

        function getTodos(){
            axios.get("/todos")
        .then(function(response){
            console.log(response.data)
            setTodos(response.data);
        })

        
        .catch(function(error){
            console.log(error);
        });
    };
    function addTodo(){
        let newTodoObject ={name:todoEnters,status:statusEnters};
        console.log(newTodoObject);
        axios
        .post("/todos",newTodoObject)
        .then(function(response){
            console.log(response)
            if(response.data.status==1){
                getTodos();
            }
            
        })
    }
    function changeTodoEntered(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        setTodoEntered(e.target.value);
    }


    function deleteTodo(indexToDelete){
        let newTodos = todo.filter(function (val,index){
            if (indexToDelete == index) return false;
            return true;
        });
        setTodos(newTodos);
    }

    function deleteTodo(indexToDelete){
        axios.delete(`/todos/${indexToDelete}`)
        .then(function (response){
            console.log(response);
            getTodos();
        })
        .catch(function (error){
            console.log(error);
        });
    }
    return (
        <div><input type="text" name="todoitem" value={todoEnters} onChange = {changeTodoEntered} />
        <select onChange={function(e){
            setStatusEntered(e.target.value);
        }}>
            <option value="complete">completed</option>
            <option value="incomplete">not completed</option>
        </select>

        
        <button onClick={addTodo}>  Add todo</button>
        
            {
                todo.map(function (val,index){
                    return <div>{val.name} <button onClick={function (){ deleteTodo(index)}}> Delete </button>
                    <div>
                        Status:{val.status}
                    </div>
                    </div>
                })
            }
        </div>
    );

}

export default Todo;