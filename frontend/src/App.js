import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar'; // Import Navbar
import Signup from './auth/Signup';
import Login from './auth/Login';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import CreateCar from './components/CreateCar';
import EditCar from './components/EditCar';
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './components/Home'; // Import Home component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Add Navbar component here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
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
