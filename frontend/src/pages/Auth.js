import React, { useState } from 'react';
import API from '../api/api'; // Axios instance for backend calls
import { useNavigate } from 'react-router-dom';

const Auth = ({ isSignUp }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        income: '',
        location: '',
        occupation: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await API.post('/users/register', formData);
                alert('Registration successful!');
                navigate('/signin');
            } else {
                const { data } = await API.post('/users/login', {
                    email: formData.email,
                    password: formData.password,
                });
                sessionStorage.setItem('userId', data.userId); // Save user ID for auto-login
                alert('Login successful!');
                navigate('/schemes');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('Error during authentication');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                            <form onSubmit={handleSubmit}>
                                {isSignUp && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter your name"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="age" className="form-label">Age</label>
                                            <input
                                                type="number"
                                                id="age"
                                                name="age"
                                                className="form-control"
                                                placeholder="Enter your age"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="income" className="form-label">Income</label>
                                            <input
                                                type="text"
                                                id="income"
                                                name="income"
                                                className="form-control"
                                                placeholder="Enter your income"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                className="form-control"
                                                placeholder="Enter your location"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="occupation" className="form-label">Occupation</label>
                                            <input
                                                type="text"
                                                id="occupation"
                                                name="occupation"
                                                className="form-control"
                                                placeholder="Enter your occupation"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className={`btn btn-${isSignUp ? 'success' : 'primary'} w-100`}>
                                    {isSignUp ? 'Sign Up' : 'Sign In'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

