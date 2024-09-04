import React from 'react';
import { useParams } from 'react-router-dom';
import './ParamExample.css'; // Import a CSS file for styling

const ParamExample: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="param-container">
      <h1 className="param-title">Param Example</h1>
      <p className="param-text">Param ID: <span className="param-id">{id}</span></p>
    </div>
  );
};

export default ParamExample;
