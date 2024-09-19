import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(false); // Hide success message before making the request
        dispatch(loginUser(formData)).finally(() => {
            // This will be called after the login attempt finishes
            if (!error && token) {
                setShowSuccess(true); // Show success message only if there is no error and a token is received
                navigate('/categories'); // Redirect to categories page or any other page
            }
        });
    };

    if (token) {
        return null; // Optionally, return null to hide the form if already logged in
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Login</button>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {showSuccess && <p>Login successful!</p>}
            </form>
        </div>
    );
};

export default LoginForm;
