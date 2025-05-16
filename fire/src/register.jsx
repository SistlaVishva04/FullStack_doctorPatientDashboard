import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"; // Assuming you have a CSS file for styling
function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
    email: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    city: "",
    profilePic: "",
    role: "",
  });

  const [error, setError] = useState(""); // For password mismatch message

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error message when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const {
      confirmPassword, // exclude confirmPassword from being sent
      ...submitData
    } = formData;

    const res = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });

    if (res.ok) {
      alert("Registered successfully! Please login.");
      navigate("/login");
    } else if (res.status === 409) {
      alert("Username already exists!");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h1>📝 Register</h1>
      <form onSubmit={handleSubmit}>
        
        
        <input name="firstName" placeholder="First Name" onChange={handleChange} /><br />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="username" placeholder="Username" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required /><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input name="addressLine1" placeholder="Address" onChange={handleChange} /><br />
        <input name="city" placeholder="City" onChange={handleChange} /><br />
        <input name="profilePic" placeholder="Profile Picture URL" onChange={handleChange} /><br />
        <select name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
        </select><br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
