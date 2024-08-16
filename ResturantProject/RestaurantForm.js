import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './App.css';

const RestaurantForm = ({ initialValues, onSubmit, editMode }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Restaurant name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    status: Yup.boolean().required('Status is required'),
  });

  const handleSubmit = async (values) => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:1337/api/resturants/${initialValues.id}`, { data: values });
      } else {
        await axios.post('http://localhost:1337/api/resturants', { data: values });
      }
      onSubmit();  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="name">Restaurant Name</label>
            <Field
              name="name"
              type="text"
              id="name"
              className="input"
            />
            {touched.name && errors.name ? (
              <div className="error">{errors.name}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="email"
              id="email"
              className="input"
            />
            {touched.email && errors.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={values.status}
                onChange={(e) => setFieldValue('status', e.target.checked)}
              />
              Status
            </label>
          </div>
          <button type="submit" className="button">
            {editMode ? 'Edit' : 'Add'} Restaurant
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RestaurantForm;
