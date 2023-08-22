/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addPage.css';

function AddPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  

  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [sexError, setSexError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [departmentError, setDepartmentError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError('');
    setAgeError('');
    setSexError('');
    setEmailError('');
    setSalaryError('');
    setDepartmentError('');

    // Validate fields
    let hasError = false;

    if (!name) {
      setNameError('Name is required');
      hasError = true;
    }

    if (!age) {
      setAgeError('Age is required');
      hasError = true;
    } else if (isNaN(age)) {
      setAgeError('Age must be a number');
      hasError = true;
    }

    if (!sex) {
      setSexError('Sex is required');
      hasError = true;
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
      hasError = true;
    }

    if (!salary) {
      setSalaryError('Salary is required');
      hasError = true;
    } else if (isNaN(salary)) {
      setSalaryError('Salary must be a number');
      hasError = true;
    }

    if (!department) {
      setDepartmentError('Department is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newEmployee = {
      name,
      age,
      sex,
      email,
      salary,
      department,
    };

    try {
      await axios.post('http://localhost:8080/employee', newEmployee);
      console.log('Employee added successfully');
      navigate('/employee');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container1">
      <div className="add-page-container3" >
        <h2 style={{ marginTop: '20px' }}>Add Page</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {nameError && <span className="error">{nameError}</span>}
          </div>
          <div>
            <label>Age:</label>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            {ageError && <span className="error">{ageError}</span>}
          </div>
          <div>
            <label>Sex:</label>
            <div>
              <div className="radio-container">
                <label className={`radio-label ${sex === 'Male' ? 'red' : ''}`}>
                  <input
                    type="radio"
                    value="Male"
                    checked={sex === 'Male'}
                    onChange={() => setSex('Male')}
                  />
                  <span className="radio-button"></span>
                  Male
                </label>
              </div>
              <div className="radio-container">
                <label className={`radio-label ${sex === 'Female' ? 'green' : ''}`}>
                  <input
                    type="radio"
                    value="Female"
                    checked={sex === 'Female'}
                    onChange={() => setSex('Female')}
                  />
                  <span className="radio-button"></span>
                  Female
                </label>
              </div>
            </div>
            {sexError && <span className="error">{sexError}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <span className="error">{emailError}</span>}
          </div>
          <div>
            <label>Salary:</label>
            <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
            {salaryError && <span className="error">{salaryError}</span>}
          </div>
          <div>
            <label>Department:</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Supporting">Supporting</option>
              <option value="Developer">Developer</option>
              <option value="Testing">Testing</option>
              <option value="Sales">Sales</option>
            </select>
            {departmentError && <span className="error">{departmentError}</span>}
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPage;*/

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addPage.css';

function AddPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState(null);

  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [sexError, setSexError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [imageError, setImageError] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError('');
    setAgeError('');
    setSexError('');
    setEmailError('');
    setSalaryError('');
    setDepartmentError('');
    setImageError('');

    let hasError = false;

    // Validation code for other fields...

    if (!image) {
      setImageError('Image is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('sex', sex);
    formData.append('email', email);
    formData.append('salary', salary);
    formData.append('department', department);

    try {
      await axios.post('http://localhost:8080/employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Employee added successfully');
      navigate('/employee');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container1">
      <div className="add-page-container3">
        <h2 style={{ marginTop: '20px' }}>Add Page</h2>
        <form onSubmit={handleSubmit}>
          
          <div>
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageError && <span className="error">{imageError}</span>}
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPage;*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addPage.css';

function AddPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState(null);

  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [sexError, setSexError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [imageError, setImageError] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError('');
    setAgeError('');
    setSexError('');
    setEmailError('');
    setSalaryError('');
    setDepartmentError('');
    setImageError('');

    let hasError = false;

    // Validation code for other fields...

    if (!name) {
      setNameError('Name is required');
      hasError = true;
    }

    if (!age) {
      setAgeError('Age is required');
      hasError = true;
    } else if (isNaN(age)) {
      setAgeError('Age must be a number');
      hasError = true;
    }

    // Validation code for other fields...

    if (!image) {
      setImageError('Image is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('sex', sex);
    formData.append('email', email);
    formData.append('salary', salary);
    formData.append('department', department);

    try {
      await axios.post('http://localhost:8080/employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Employee added successfully');
      navigate('/employee');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container1">
      <div className="add-page-container3">
        <h2 style={{ marginTop: '20px' }}>Add Page</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {nameError && <span className="error">{nameError}</span>}
          </div>
          <div>
            <label>Age:</label>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            {ageError && <span className="error">{ageError}</span>}
          </div>
          <div>
            <label>Sex:</label>
            <div>
              <div className="radio-container">
                <label className={`radio-label ${sex === 'Male' ? 'red' : ''}`}>
                  <input
                    type="radio"
                    value="Male"
                    checked={sex === 'Male'}
                    onChange={() => setSex('Male')}
                  />
                  <span className="radio-button"></span>
                  Male
                </label>
              </div>
              <div className="radio-container">
                <label className={`radio-label ${sex === 'Female' ? 'green' : ''}`}>
                  <input
                    type="radio"
                    value="Female"
                    checked={sex === 'Female'}
                    onChange={() => setSex('Female')}
                  />
                  <span className="radio-button"></span>
                  Female
                </label>
              </div>
            </div>
            {sexError && <span className="error">{sexError}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <span className="error">{emailError}</span>}
          </div>
          <div>
            <label>Salary:</label>
            <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
            {salaryError && <span className="error">{salaryError}</span>}
          </div>
          <div>
            <label>Department:</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Supporting">Supporting</option>
              <option value="Developer">Developer</option>
              <option value="Testing">Testing</option>
              <option value="Sales">Sales</option>
            </select>
            {departmentError && <span className="error">{departmentError}</span>}
          </div>
          <div>
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageError && <span className="error">{imageError}</span>}
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPage;
