
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAction } from '../actions/todoactions';
import '../css/EditTodo.css'

const EditTodo = ({ todoId, onClose }) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
      setName(todo.name);
      setStatus(todo.status);
    }
  }, [todoId, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && status) {
      dispatch(editAction(todoId, { name, status }));
      onClose(); // Close the edit form
    }
  };

  return (
    <div className="edit-todo">
      <h2>Edit Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTodo;
