/*import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './editPage.css';
import axios from 'axios';

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      const rowDataFromLocation = location.state?.rowData;

      if (rowDataFromLocation) {
        console.log('rowDataFromLocation:', rowDataFromLocation);
        setRowData(rowDataFromLocation);
        setName(rowDataFromLocation.name);
        setAge(rowDataFromLocation.age);
        setSex(rowDataFromLocation.sex);
        setEmail(rowDataFromLocation.email);
        setSalary(rowDataFromLocation.salary);
        setDepartment(rowDataFromLocation.department);
      } else {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        console.log('id:', id);

        if (id) {
          try {
            const response = await axios.get(`http://localhost:8080/employees/${id}`);
            console.log('Response data:', response.data);
            setRowData(response.data);
            setName(response.data.name);
            setAge(response.data.age);
            setSex(response.data.sex);
            setEmail(response.data.email);
            setSalary(response.data.salary);
            setDepartment(response.data.department);
          } catch (error) {
            console.error('Error fetching employee:', error);
          }
        }
      }
    };

    fetchData();
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError('');
    setAgeError('');
    setSexError('');
    setEmailError('');
    setSalaryError('');
    setDepartmentError('');

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

    if (rowData && rowData.id) {
      // Update existing employee
      const updatedEmployee = {
        id: rowData.id,
        name,
        age,
        sex,
        email,
        salary,
        department,
      };

      console.log('updatedEmployee:', updatedEmployee);

      try {
        await axios.put(`http://localhost:8080/employees/${rowData.id}`, updatedEmployee);
        console.log('Employee updated successfully');
        navigate('/employee');
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    } else {
      // Create new employee
      const newEmployee = {
        name,
        age,
        sex,
        email,
        salary,
        department,
      };

      console.log('newEmployee:', newEmployee);

      try {
        await axios.post('http://localhost:8080/employee', newEmployee);
        console.log('Employee added successfully');
        navigate('/employee');
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    }
  };
  const isValidEmail = (email) => {
    // Email validation logic here (you can use regex or other methods)
    // Example regex pattern for basic email validation:
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  if (!rowData || !rowData.id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-5" style={{backgroundImage: 'url(https://www.stonebriar.org/wp-content/uploads/2021/09/Scripture-1-john-3-16-1536x864.jpg)'}}>
      
      <div className="edit-Page-container">
        <h5 style={{ marginTop: '50px' }}>EditPage</h5>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input type="text" value={rowData.id} readOnly />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <span className="error" style={{ fontSize: '15px'}}>{nameError}</span>}
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {ageError && <span className="error" style={{ fontSize: '15px'}}>{ageError}</span>}
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
  {sexError && <span className="error" style={{ fontSize: '15px'}}>{sexError}</span>}
</div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="error" style={{ fontSize: '15px'}}>{emailError}</span>}
          </div>
          <div>
            <label>Salary:</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            {salaryError && <span className="error" style={{ fontSize: '15px'}}>{salaryError}</span>}
          </div>
          <div>
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Supporting">Supporting</option>
            <option value="Developer">Developer</option>
            <option value="Testing">Testing</option>
            <option value="Sales">Sales</option>
            
          </select>
          {departmentError && <span className="error" style={{ fontSize: '15px'}}>{departmentError}</span>}
        </div>
        <div style={{ marginTop: '10px' }}>
        <button type="submit" style={{ fontSize: '14px', padding: '6px 12px' }}>Update</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;*/

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './editPage.css';
import axios from 'axios';

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      const rowDataFromLocation = location.state?.rowData;

      if (rowDataFromLocation) {
        setRowData(rowDataFromLocation);
        setName(rowDataFromLocation.name);
        setAge(rowDataFromLocation.age);
        setSex(rowDataFromLocation.sex);
        setEmail(rowDataFromLocation.email);
        setSalary(rowDataFromLocation.salary);
        setDepartment(rowDataFromLocation.department);
      } else {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');

        if (id) {
          try {
            const response = await axios.get(`http://localhost:8080/employees/${id}`);
            setRowData(response.data);
            setName(response.data.name);
            setAge(response.data.age);
            setSex(response.data.sex);
            setEmail(response.data.email);
            setSalary(response.data.salary);
            setDepartment(response.data.department);
            setImage(new Blob([response.data.image])); // Set the image data from the response
          } catch (error) {
            console.error('Error fetching employee:', error);
          }
        }
      }
    };

    fetchData();
  }, [location]);

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

    if (!image && !rowData?.image) {
      setImageError('Image is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const formData = new FormData();
    formData.append('image', image || rowData.image);
    formData.append('id', rowData.id);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('sex', sex);
    formData.append('email', email);
    formData.append('salary', salary);
    formData.append('department', department);

    try {
      if (rowData && rowData.id) {
        await axios.put(`http://localhost:8080/employees/${rowData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Employee updated successfully');
      } else {
        await axios.post('http://localhost:8080/employee', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Employee added successfully');
      }
      navigate('/employee');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  if (!rowData || !rowData.id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-5" style={{backgroundImage: 'url(https://www.stonebriar.org/wp-content/uploads/2021/09/Scripture-1-john-3-16-1536x864.jpg)'}}>
      <div className="edit-Page-container">
        <h5 style={{ marginTop: '50px' }}>EditPage</h5>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input type="text" value={rowData.id} readOnly />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {nameError && <span className="error" style={{ fontSize: '15px'}}>{nameError}</span>}
          </div>
          <div>
            <label>Age:</label>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            {ageError && <span className="error" style={{ fontSize: '15px'}}>{ageError}</span>}
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
            {sexError && <span className="error" style={{ fontSize: '15px'}}>{sexError}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <span className="error" style={{ fontSize: '15px'}}>{emailError}</span>}
          </div>
          <div>
            <label>Salary:</label>
            <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
            {salaryError && <span className="error" style={{ fontSize: '15px'}}>{salaryError}</span>}
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
            {departmentError && <span className="error" style={{ fontSize: '15px'}}>{departmentError}</span>}
          </div>
          <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          {imageError && <span className="error" style={{ fontSize: '15px' }}>{imageError}</span>}
        </div>
          <div style={{ marginTop: '10px' }}>
            <button type="submit" style={{ fontSize: '14px', padding: '6px 12px' }}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;