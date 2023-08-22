/*import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./Login/Login";
import Employee from "./Employee/Employee";
import EmployeeDetails from "./Employee/EmployeeDetails";
import EditPage from "./EditPage/EditPage";
import AddPage from "./AddPage/AddPage";
import HomePage from "./HomePage/HomePage";
import Registration from './Login/Registration';

const routes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: '/employee',
      element: <Employee/>
    },
    {
      path: '/employees/:id', // Update the path to include the parameter
      element: <EmployeeDetails />,
    },
    {
      path: '/edit',
      element: <EditPage/>
    },
    
    {
      path: '/add',
      element: <AddPage/>
    },
    {
      path: '/home',
      element: <HomePage/>
    },
    {
      path:'/register',
      Element: <Registration/>

    }
  ];
  
  export default routes;*/

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./Login/Login";
import Employee from "./Employee/Employee";
import EmployeeDetails from "./Employee/EmployeeDetails";
import EditPage from "./EditPage/EditPage";
import AddPage from "./AddPage/AddPage";
import HomePage from "./HomePage/HomePage";
import Registration from './Login/Registration';

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/employee',
    element: <Employee />
  },
  {
    path: '/employee/details/:id', // Update the path to include the parameter
    element: <EmployeeDetails />,
  },
  {
    path: '/edit',
    element: <EditPage />
  },
  {
    path: '/add',
    element: <AddPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/register', // Corrected 'element' key
    element: <Registration />
  }
];

export default routes;  