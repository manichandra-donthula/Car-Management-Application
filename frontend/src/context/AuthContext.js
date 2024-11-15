import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Track auth check completion

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("AuthContext - User data fetched on refresh:", response.data);
          setUser(response.data);
        })
        .catch((err) => {
          console.error("AuthContext - Error fetching user data:", err);
          localStorage.removeItem("token");
        })
        .finally(() => {
          setIsAuthChecked(true); // Set flag after check is complete
        });
    } else {
      setIsAuthChecked(true); // No token, auth check done
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthChecked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
