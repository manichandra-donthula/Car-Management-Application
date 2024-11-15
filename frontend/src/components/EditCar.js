import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log("Fetched car data:", response.data);
        setCar(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch((err) => {
        console.error("Error fetching car data:", err);
        setError("Failed to load car data for editing.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCar = {
      title,
      description,
    };

    axios
      .put(`/api/cars/${id}`, updatedCar, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        console.log("Car updated successfully");
        navigate(`/cars/${id}`);
      })
      .catch((err) => {
        console.error("Error updating car:", err);
        alert("Failed to update car. Please check the console for details.");
      });
  };

  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Car Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Car Description"
      />
      <button type="submit">Update Car</button>
    </form>
  );
};

export default EditCar;
