// Navbar.js
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/cars" style={{ marginRight: '15px' }}>Car List</Link>
        <Link to="/cars/create" style={{ marginRight: '15px' }}>Create Car</Link>
      </div>
      {user ? (
        <div>
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
