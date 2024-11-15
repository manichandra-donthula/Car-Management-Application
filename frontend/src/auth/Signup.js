import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Set the base URL for all Axios requests
axios.defaults.baseURL = 'http://localhost:5500';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Make the API request for user registration
    axios
      .post("/api/users/signup", { email, password })
      .then((response) => {
        // Store the token in localStorage and update the context
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        navigate("/cars");  // Redirect to cars page or dashboard
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : "An error occurred");
      });
  };

  return (
    <form onSubmit={handleSignup}>
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
      <button type="submit">Sign Up</button>
      
      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Signup;
