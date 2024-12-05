import { useEffect, useState } from "react";
import axios from "axios";
import TodoForms from "./TodoForms";
import TodoList from "./TodoList";

function Todo() {
    const InitialTodo = [{ name: "default name", status: "default status", description: "default description" }];
    const [todos, setTodos] = useState(InitialTodo);
    const [todoEntered, setTodoEntered] = useState("Enter a Hobby");
    const [statusEntered, setStatus] = useState("completed");
    const [descriptionEntered, setDescriptionEntered] = useState("Enter a description");

    useEffect(() => {
        console.log("Function is called on load");
        getTodos();
    }, []);

    const changeTodo = (e) => {
        setTodoEntered(e.target.value);
    };

    const changeDescription = (e) => {
        setDescriptionEntered(e.target.value); 
    };

    const addTodo = () => {
        const newTodo = {
            name: todoEntered,
            status: statusEntered,
            description: descriptionEntered 
        };
        axios.post("http://localhost:3000/todo", newTodo)
            .then(response => {
                getTodos(); 
            })
            .catch(error => {
                console.log(error);
            });
    };

    const DeleteTodo = (id) => {
        axios.delete(`http://localhost:3000/todo/${id}`)
            .then(response => {
                getTodos(); 
            })
            .catch(error => {
                console.log(error);
            });
    };

    const clearTodo = () => {
        setTodos([]);
    };

    const getTodos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/todo");
            setTodos(response.data); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <TodoForms 
                todoEntered={todoEntered}
                changeTodo={changeTodo}
                descriptionEntered={descriptionEntered} 
                changeDescription={changeDescription}
                setStatus={setStatus}
                addTodo={addTodo}
            />
            <TodoList todos={todos} DeleteTodo={DeleteTodo} />
        </div>
    );
}

export default Todo;