import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './employeeDetails.css';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = () => {
    const apiUrl = `http://localhost:8080/employee/details/${id}`;

    axios
      .get(apiUrl)
      .then(response => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (!employee) {
    return <div className="not-found">No employee found</div>;
  }

  // Render employee details when employee data is available
  return (
    <div className="employee-container">
      <div className="image-container">
        <img src="https://www.naturalstoneconsulting.co.uk/wp-content/uploads/2015/09/cropped-toast-icon.png" alt="Image" />
        <img src={`http://localhost:8080/employee/image/${employee.id}`} alt="Employee" />
        <h1>Welcome Back to Employee Details</h1>
      </div>
      <div className="employee-details">
        <h2>Employee Details</h2>
        <p>ID: {employee.id}</p>
        <p>Name: {employee.name}</p>
        <p>Age: {employee.age}</p>
        <p>Sex: {employee.sex}</p>
        <p>Email: {employee.email}</p>
        <p>Salary: {employee.salary}</p>
        <p>Department: {employee.department}</p>
      </div>
    </div>
  );
}

export default EmployeeDetails;