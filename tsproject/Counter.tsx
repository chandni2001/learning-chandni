import React, { useState } from "react";
import './Counter.css'; // Import a CSS file for styling

const Counter: React.FC = () => {
  const [stateCount, setStateCount] = useState<number>(2);

  const increase = () => setStateCount(stateCount + 1);
  const decrease = () => setStateCount(stateCount - 1);
  const reset = () => setStateCount(0);

  return (
    <div className="counter-container">
      <h1 className="counter-display">{stateCount}</h1>
      <div className="button-group">
        <button className="counter-button" onClick={increase}>Increase</button>
        <button className="counter-button" onClick={decrease}>Decrease</button>
        <button className="counter-button" onClick={reset}>Reset to Zero</button>
      </div>
    </div>
  );
};

export default Counter;
