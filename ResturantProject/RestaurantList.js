import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantForm from './RestaurantForm';
import './App.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/resturants');
      setRestaurants(response.data.data); 
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/resturants/${id}`);
      fetchRestaurants();
      setSelectedRestaurant(null); 
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = () => {
    setIsEditing(false);
    setSelectedRestaurant(null);
    fetchRestaurants();
  };

  return (
    <div>
      
      <div className="form-container">
        <RestaurantForm
          initialValues={{ name: '', email: '', status: false }}
          onSubmit={handleFormSubmit}
          editMode={false}
        />
      </div>

      
      <ul className="list">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="list-item">
            <span>{restaurant.attributes.name}</span>
            <button onClick={() => handleDetails(restaurant)} className="button">
              Details
            </button>
            <button onClick={() => handleDelete(restaurant.id)} className="button secondary">
              Delete
            </button>
          </li>
        ))}
      </ul>

      
      {selectedRestaurant && (
        <div className="details-container">
          {!isEditing ? (
            <>
              <h2>Restaurant Details</h2>
              <p><strong>Name:</strong> {selectedRestaurant.attributes.name}</p>
              <p><strong>Email:</strong> {selectedRestaurant.attributes.email}</p>
              <p><strong>Status:</strong> {selectedRestaurant.attributes.status ? 'Active' : 'Inactive'}</p>
              <button onClick={handleEditClick} className="button">
                Edit
              </button>
            </>
          ) : (
            <RestaurantForm
              initialValues={{
                id: selectedRestaurant.id,
                name: selectedRestaurant.attributes.name,
                email: selectedRestaurant.attributes.email,
                status: selectedRestaurant.attributes.status,
              }}
              onSubmit={handleFormSubmit}
              editMode={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
