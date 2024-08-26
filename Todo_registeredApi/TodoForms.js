import React from 'react';
import './css/TodoForms.css'; // Adjust the path if necessary

function TodoForms({ todoEntered, changeTodo, setStatus, addTodo, descriptionEntered, changeDescription }) {
    return (
        <div className="todo-form-container">
            <input 
                type="text" 
                value={todoEntered} 
                onChange={changeTodo} 
                placeholder="Enter a Hobby" 
            />
            <input 
                type="text" 
                value={descriptionEntered} 
                onChange={changeDescription} 
                placeholder="Enter a Description" 
            />
            <select onChange={(e) => setStatus(e.target.value)}>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
}

export default TodoForms;
