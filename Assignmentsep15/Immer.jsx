import { useState } from 'react';
import { produce } from 'immer';

const Immer = () => {
  const [state, setState] = useState([
    { todo: 'Learn React', done: true },
    { todo: 'Try Immer', done: false }
  ]);
  const [city, setCity] = useState('Paris');
  const [showGreeting, setShowGreeting] = useState(true);

  const addTodo = () => {
    const nextState = produce(state, draft => {
      draft.push({ todo: 'Tweet about Immer', done: false });
      draft[1].done = true;
    });
    setState(nextState);
  };

  const updateCity = () => {
    setCity('New York');
  };

  const toggleGreeting = () => {
    setShowGreeting(prev => !prev);
  };

  return (
    <div>
      <h2>Todos:</h2>
      <ul>
        {state.map((item, index) => (
          <li key={index}>{item.todo} - {item.done ? 'Done' : 'Not Done'}</li>
        ))}
      </ul>
      <button onClick={addTodo}>Add Todo</button>

      <h2>Current City: {city}</h2>
      <button onClick={updateCity}>Change City</button>

      {showGreeting && <h1>Welcome to React!</h1>}
      <button onClick={toggleGreeting}>Toggle Greeting</button>
    </div>
  );
};

export default Immer;
