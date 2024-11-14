import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setCar(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h1>{car.title}</h1>
      <p>{car.description}</p>
      <button onClick={() => navigate(`/cars/edit/${id}`)}>Edit</button>
    </div>
  );
};

export default CarDetail;
