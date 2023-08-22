import React from 'react';
import './App.css';
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom';
import routes from './Components/routes';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Nectra</div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/employee" className="nav-link">Employee</Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">Add</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

function App() {
  const routing = useRoutes(routes);

  return (
    <div>
      <Header />
      {routing}
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;




