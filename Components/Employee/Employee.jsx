/*import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './employee.css';
import EmployeeDetails from './EmployeeDetails';

function Employee(props) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (rowData) => {
    navigate('/edit', { state: { rowData } });
  };

  const handleAdd = (newEmployeeData) => {
    const apiUrl = `http://localhost:8080/employee`;

    axios
      .post(apiUrl, newEmployeeData)
      .then(() => {
        fetchEmployees(); // Fetch updated employee list after addition
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  };

  const handleDelete = (employeeId) => {
    const apiUrl = `http://localhost:8080/employees/${employeeId}`;

    axios
      .delete(apiUrl)
      .then(() => {
        fetchEmployees(); // Fetch updated employee list after deletion
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  const fetchEmployees = () => {
    const apiUrl = 'http://localhost:8080/employee';

    axios
      .get(apiUrl)
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  };

  return (
    <>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button className="add-button" onClick={handleAdd}>Add Employee</button>
      </div>
      <div className="table-container" style={{ marginTop: '20px', border: '1px solid black' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Department</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.sex}</td>
                <td>{item.email}</td>
                <td>{item.salary}</td>
                <td>{item.department}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                </td>
                <td>
                  <Link to={`/employees/${item.id}`} className="view-button">View</Link>
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Routes>
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}

export default Employee;*/

import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './employee.css';
import EmployeeDetails from './EmployeeDetails';

function Employee(props) {
  const [employees, setEmployees] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (rowData) => {
    navigate('/edit', { state: { rowData } });
  };

  const handleAdd = (newEmployeeData) => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('name', newEmployeeData.name);
    formData.append('age', newEmployeeData.age);
    formData.append('sex', newEmployeeData.sex);
    formData.append('email', newEmployeeData.email);
    formData.append('salary', newEmployeeData.salary);
    formData.append('department', newEmployeeData.department);

    const apiUrl = `http://localhost:8080/employee`;

    axios
      .post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        fetchEmployees();
        setSelectedImage(null);
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  };

  const handleDelete = (employeeId) => {
    const apiUrl = `http://localhost:8080/employees/${employeeId}`;

    axios
      .delete(apiUrl)
      .then(() => {
        fetchEmployees();
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  const fetchEmployees = () => {
    const apiUrl = 'http://localhost:8080/employee';

    axios
      .get(apiUrl)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };

  return (
    <>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <button className="add-button" onClick={() => handleAdd({})}>
          Add Employee
        </button>
      </div>
      <div className= "table-container" style={{ marginTop: '20px', border: '1px solid black' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Image</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.sex}</td>
                <td>{item.email}</td>
                <td>{item.salary}</td>
                <td>{item.department}</td>
                <td>
  {console.log('Image URL:', `http://localhost:8080/employee/image/${item.id}`)}
  <img src={`http://localhost:8080/employee/image/${item.id}`} alt="image" />
</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                </td>
                <td>
                <Link to={`/employee/details/${item.id}`} className="view-button">
  View
</Link>
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Routes>
        <Route path="/employee/details/:id" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}

export default Employee;