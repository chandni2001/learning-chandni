import React from 'react';
import RestaurantList from './RestaurantList';
import './App.css';

const AdminPage = () => {
  return (
    <div className="container">
      <h1>Resturant Admin Page</h1>
      <RestaurantList />
    </div>
  );
};

export default AdminPage;
