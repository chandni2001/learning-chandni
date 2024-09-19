import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CategoryList from './components/CategoryList';
import ServicesList from './components/ServicesList'; // Import the ServicesList component
import NavBar from './components/NavBar'; // Import the NavBar component

const App = () => {
    return (
        <Router>
            <div>
                <NavBar /> {/* Add the NavBar component here */}
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/categories" element={<CategoryList />} /> {/* Add route for categories */}
                    <Route path="/category/:categoryName" element={<ServicesList />} /> {/* Add route for services */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
