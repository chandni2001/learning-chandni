import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoStatus, setNewTodoStatus] = useState<'complete' | 'incomplete'>('incomplete');

  useEffect(() => {
    axios.get('http://localhost:3000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('There was an error!', error));
  }, [todos]);

  const addTodo = () => {
    const statusBoolean = newTodoStatus === 'complete';
    axios.post('http://localhost:3000/todos', { name: newTodoName, status: statusBoolean })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('There was an error!', error));
  };

  const deleteTodo = (id: number) => {
    axios.delete(`http://localhost:3000/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('There was an error!', error));
  };

  

  return (
    <div className="todo-wrapper">
      <div className="todo-container">
        <h2 className="todo-header">Todo</h2>
        <input
          type="text"
          placeholder="New Todo"
          value={newTodoName}
          onChange={e => setNewTodoName(e.target.value)}
          className="todo-input"
        />
        <label className="todo-label">
          Status:
          <select
            value={newTodoStatus}
            onChange={e => setNewTodoStatus(e.target.value as 'complete' | 'incomplete')}
            className="todo-select"
          >
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <button onClick={addTodo} className="todo-button">Add Todo</button>
        
        <ul className="todo-list">
          {todos.map((todo,index) => (
            <li key={todo.id} className="todo-item">
              <span className="todo-name">{todo.name}</span> - 
              <span className="todo-status">{todo.status ? 'Complete' : 'Incomplete'}</span>
              <button onClick={() => deleteTodo(index)} className="todo-delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
