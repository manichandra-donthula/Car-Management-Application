import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Car Management Application</h1>
      <p>Please log in or sign up to manage your cars and access other features.</p>
      <div style={{ margin: "20px 0" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px" }}>Login</button>
        </Link>
        <Link to="/signup">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
