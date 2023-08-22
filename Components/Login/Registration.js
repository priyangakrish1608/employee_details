import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState(null);
  
    const onSubmit = async (data) => {
      try {
        const response = await axios.post('http://localhost:8080/user/register', data);
        console.log('Registration successful:', response.data);
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Registration failed:', error);
        setRegistrationError('Registration failed. Please try again.');
      }
    };
  

  return (
    <div className="login-container">
      <div className="image-container" data-aos="fade-in" data-aos-delay="1000">
        {/* Your image and welcome text */}
        <img src="https://www.tg.point-genie.com/girl_working.jpg/girl_working.jpg" alt="Image" />
        <h1>HI, Welcome to Nectra</h1>
        <h2>Register for a new account</h2>
      </div>
      <div className="container">
        <h3>Registration</h3>
        {/* Display registration error if registrationError is not null */}
        {registrationError && <div className="error">{registrationError}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Registration;