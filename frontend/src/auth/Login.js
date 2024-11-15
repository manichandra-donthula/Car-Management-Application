import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

// Set the base URL for all Axios requests
axios.defaults.baseURL = 'http://localhost:5500';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Capture error messages
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook to access current location

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios
      .post("/api/users/login", { email, password })
      .then((response) => {
        console.log("Login response:", response.data);
        localStorage.setItem("token", response.data.token);
        login(response.data.user); // Update context with user data
  
        // Redirect to the intended route or default to /cars
        const redirectPath = location.state?.from?.pathname || "/cars";
        navigate(redirectPath);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : "An error occurred");
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
