import React from 'react';
import { Link } from 'react-router-dom';
import './css/TodoItems.css'; // Adjust the path if necessary

function TodoItem({ val, DeleteTodo }) {
    return (
        <div className="todo-item-container">
            <h3>{val.name}</h3>
            <p>Description: {val.description}</p> {/* Display the description */}
            <button onClick={() => DeleteTodo(val._id)}>Delete</button>
            <Link to={`${val._id}`}>View Todo</Link>
        </div>
    );
}

export default TodoItem;
