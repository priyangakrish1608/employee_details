/*const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

/*const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Priya@12345",
  database: "sampleapplication"
});

// Login endpoint
app.post("/user/login", (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  const query = 'SELECT * FROM user WHERE username = ?';
  pool.query(query, [username], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Successful login
    return res.status(200).json({ message: 'Login successful' });
  });
});*/


/*const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer();



const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Priya@12345",
  database: "sampleapplication",
});

// Register endpoint for creating new users
app.post("/user/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Insert the user into the database with the hashed password
    const query = "INSERT INTO user (username, password) VALUES (?, ?)";
    pool.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ error: 'An error occurred while adding the user.' });
      }

      return res.json({ success: true, message: 'User registered successfully.' });
    });
  } catch (error) {
    console.error('Error while hashing password:', error);
    return res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});

// Login endpoint
app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const query = 'SELECT * FROM user WHERE username = ?';
    pool.query(query, [username], async (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ message: 'An error occurred' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // Successful login
      return res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    console.error('Error while checking password:', error);
    return res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});





app.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee_entity";

  pool.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'An error occurred while fetching employees.' });
    }

    return res.json(data);
  });
});

/*app.post("/employee", (req, res) => {
  const { name, age, sex, email, salary, department } = req.body;

  const query = "INSERT INTO employee_entity (`name`, `age`, `sex`, `email`, `salary`, `department`) VALUES (?, ?, ?, ?, ?, ?)";
  pool.query(query, [name, age, sex, email, salary, department], (err, result) => {
    if (err) {
      console.error('Error adding employee:', err);
      return res.status(500).json({ error: 'An error occurred while adding the employee.' });
    }

    return res.json({ success: true, message: 'Employee added successfully.' });
  });
});

app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, sex, email, salary, department } = req.body;

  const query = "UPDATE employee_entity SET `name` = ?, `age` = ?, `sex` = ?, `email` = ?, `salary` = ?, `department` = ? WHERE ID = ?";
  const values = [name, age, sex, email, salary, department, id];

  pool.query(query, values, (err, data) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'An error occurred while updating the employee.' });
    }

    return res.json({ success: true, message: 'Employee updated successfully.' });
  });
});*/
/*app.post("/employee", upload.single('image'), (req, res) => {
  const { name, age, sex, email, salary, department } = req.body;
  const image = req.file.buffer; // Get the image data from the request

  const query = "INSERT INTO employee_entity (`name`, `age`, `sex`, `email`, `salary`, `department`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [name, age, sex, email, salary, department, image];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding employee:', err);
      return res.status(500).json({ error: 'An error occurred while adding the employee.' });
    }

    return res.json({ success: true, message: 'Employee added successfully.' });
  });
});

app.put("/employees/:id", upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, age, sex, email, salary, department } = req.body;
  const image = req.file.buffer; // Get the image data from the request

  const query = "UPDATE employee_entity SET `name` = ?, `age` = ?, `sex` = ?, `email` = ?, `salary` = ?, `department` = ?, `image` = ? WHERE ID = ?";
  const values = [name, age, sex, email, salary, department, image, id];

  pool.query(query, values, (err, data) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'An error occurred while updating the employee.' });
    }

    return res.json({ success: true, message: 'Employee updated successfully.' });
  });
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM employee_entity WHERE ID = ?";
  pool.query(query, [id], (err, data) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'An error occurred while deleting the employee.' });
    }

    return res.json({ success: true, message: 'Employee deleted successfully.' });
  });
});

app.get('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const query = "SELECT * FROM employee_entity WHERE id = ?";
  pool.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error fetching employee details:', err);
      return res.status(500).json({ error: 'An error occurred while fetching employee details.' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employee = results[0];
    return res.status(200).json(employee);
  });
});
const port = 8080; 
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});*/


const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Priya@12345',
  database: 'sampleapplication',
});
// Register endpoint for creating new users
app.post("/user/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Insert the user into the database with the hashed password
    const query = "INSERT INTO user (username, password) VALUES (?, ?)";
    pool.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ error: 'An error occurred while adding the user.' });
      }

      return res.json({ success: true, message: 'User registered successfully.' });
    });
  } catch (error) {
    console.error('Error while hashing password:', error);
    return res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});

// Login endpoint
app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const query = 'SELECT * FROM user WHERE username = ?';
    pool.query(query, [username], async (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ message: 'An error occurred' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // Successful login
      return res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    console.error('Error while checking password:', error);
    return res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});





app.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee_entity";

  pool.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'An error occurred while fetching employees.' });
    }

    return res.json(data);
  });
});


app.post("/employee", upload.single('image'), (req, res) => {
  const { name, age, sex, email, salary, department } = req.body;
  const image = req.file.buffer; // Get the image data from the request

  const query = "INSERT INTO employee_entity (`name`, `age`, `sex`, `email`, `salary`, `department`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [name, age, sex, email, salary, department, image];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding employee:', err);
      return res.status(500).json({ error: 'An error occurred while adding the employee.' });
    }

    return res.json({ success: true, message: 'Employee added successfully.' });
  });
});

app.put("/employees/:id", upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, age, sex, email, salary, department } = req.body;
  const image = req.file.buffer; // Get the image data from the request

  const query = "UPDATE employee_entity SET `name` = ?, `age` = ?, `sex` = ?, `email` = ?, `salary` = ?, `department` = ?, `image` = ? WHERE ID = ?";
  const values = [name, age, sex, email, salary, department, image, id];

  pool.query(query, values, (err, data) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'An error occurred while updating the employee.' });
    }

    return res.json({ success: true, message: 'Employee updated successfully.' });
  });
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM employee_entity WHERE ID = ?";
  pool.query(query, [id], (err, data) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'An error occurred while deleting the employee.' });
    }

    return res.json({ success: true, message: 'Employee deleted successfully.' });
  });
});

app.get('/employee/image/:id', (req, res) => {
  const employeeId = req.params.id;
  const query = "SELECT image FROM employee_entity WHERE id = ?";
  pool.query(query, [employeeId], (err, results) => {
      if (err) {
          console.error('Error fetching employee image:', err);
          return res.status(500).json({ error: 'An error occurred while fetching employee image.' });
      }

      if (results.length === 0 || !results[0].image) {
          return res.status(404).json({ error: 'Image not found' });
      }

      const image = results[0].image;
      res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on your image type
      return res.end(image);
  });
});

app.get('/employee/details/:id', (req, res) => {
  const employeeId = req.params.id;
  const query = 'SELECT * FROM employee_entity WHERE id = ?';
  pool.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error fetching employee details:', err);
      return res.status(500).json({ error: 'An error occurred while fetching employee details.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employeeDetails = results[0];
    res.json(employeeDetails);
  });
});



const port = 8080; 
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
}); 














/*app.post("/employee", (req, res) => {
  const { name, age, sex, email, salary, department } = req.body;

  const query = "INSERT INTO employee_entity (`name`, `age`, `sex`, `email`, `salary`, `department`) VALUES (?, ?, ?, ?, ?, ?)";
  pool.query(query, [name, age, sex, email, salary, department], (err, result) => {
    if (err) {
      console.error('Error adding employee:', err);
      return res.status(500).json({ error: 'An error occurred while adding the employee.' });
    }

    return res.json({ success: true, message: 'Employee added successfully.' });
  });
});

app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, sex, email, salary, department } = req.body;

  const query = "UPDATE employee_entity SET `name` = ?, `age` = ?, `sex` = ?, `email` = ?, `salary` = ?, `department` = ? WHERE ID = ?";
  const values = [name, age, sex, email, salary, department, id];

  pool.query(query, values, (err, data) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'An error occurred while updating the employee.' });
    }

    return res.json({ success: true, message: 'Employee updated successfully.' });
  });
});*/





/*app.get('/employee/image/:id', (req, res) => {
  const employeeId = req.params.id;
  const query = 'SELECT `image` FROM employee_entity WHERE id = ?';

  pool.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error fetching employee image:', err);
      return res.status(500).json({ error: 'An error occurred while fetching employee image.' });
    }

    if (results.length === 0 || !results[0].image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.setHeader('Content-Type', 'image/jpeg'); // Set the appropriate content type for images
    return res.end(results[0].image);
  });
});*/