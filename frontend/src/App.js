import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './auth/Login'; // Login component in auth/ directory
import CarList from './components/CarList'; // CarList component in components/ directory
import CarDetail from './components/CarDetail'; // CarDetail component in components/ directory
import CreateCar from './components/CreateCar'; // CreateCar component in components/ directory
import EditCar from './components/EditCar'; // EditCar component in components/ directory
import ProtectedRoute from './auth/ProtectedRoute'; // Protect routes

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Car Routes */}
          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/create"
            element={
              <ProtectedRoute>
                <CreateCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/:id"
            element={
              <ProtectedRoute>
                <CarDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/edit/:id"
            element={
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
