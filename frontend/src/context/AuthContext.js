import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in AuthContext:", token); // Log the token to debug

    if (token) {
      axios
        .get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("User data fetched from backend:", response.data); // Check the user data
          setUser(response.data); // Set user data
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          localStorage.removeItem("token"); // Clear token if error
          setUser(null); // Clear user data
        });
    } else {
      setUser(null); // If no token, clear user state
    }
  }, []);

  const login = (userData) => {
    if (userData) {
      console.log("Logging in with user data:", userData);
      setUser(userData);
    } else {
      console.error("Login function received undefined user data.");
    }
  };

  const logout = () => {
    console.log("User logged out");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
