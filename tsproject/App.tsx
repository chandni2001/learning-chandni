import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Counter from './Counter';
import Login from './Login';
import ParamExample from './ParamExample';
import Todo from './Todo';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          
          <li><Link to="/login">Home</Link></li>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/todo">Todo</Link></li>
          <li><Link to="/param/1">Param Example</Link></li>
        </ul>
      </nav>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/param/:id" element={<ParamExample />} />
      </Routes>
    </Router>
  );
};

export default App;
