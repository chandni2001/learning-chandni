import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './css/TodoDetailsEdit.css'; // Adjust the path if necessary

function TodoDetailsEdit() {
    const [todoData, setTodoData] = useState({});
    const options = [{ Title: "Completed" }, { Title: "Incomplete" }];
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/todo/${id}`)
            .then(response => {
                setTodoData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const editTodo = (e) => {
        e.preventDefault();
        const todoModifiedOb = {
            name: e.target.todoitem.value,
            status: e.target.status.value,
            description: e.target.description.value // Include description
        };
        axios.put(`http://localhost:3000/todo/${id}`, todoModifiedOb)
            .then(response => {
                console.log("Todo updated successfully:", response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="todo-details-edit-container">
            <form onSubmit={editTodo}>
                <input 
                    type="text"
                    name="todoitem"
                    value={todoData.name || ''} // Handle possible undefined value
                    onChange={(e) => setTodoData({ ...todoData, name: e.target.value })}
                    placeholder="Enter todo name"
                />
                <select 
                    name="status"
                    value={todoData.status || 'Incomplete'} // Default value if status is not set
                    onChange={(e) => setTodoData({ ...todoData, status: e.target.value })}
                >
                    {options.map((option) => (
                        <option key={option.Title} value={option.Title}>
                            {option.Title}
                        </option>
                    ))}
                </select>
                <input 
                    type="text"
                    name="description"
                    value={todoData.description || ''} // Handle possible undefined value
                    onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
                    placeholder="Enter description"
                />
                <button type="submit">Edit Todo</button>
            </form>
        </div>
    );
}

export default TodoDetailsEdit;
