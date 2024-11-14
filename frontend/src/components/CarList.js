import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CarList = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/cars/search?keyword=${searchTerm}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => setCars(response.data))
        .catch((err) => console.error(err));
    }
  }, [searchTerm, user]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Cars"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.title}
            {/* Add links or buttons to view or edit details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
