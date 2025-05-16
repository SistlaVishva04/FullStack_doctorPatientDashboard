import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"; // Assuming you have a CSS file for styling
function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("userData", JSON.stringify(user));

      if (user.role === "Doctor") navigate("/dashboard/doctor");
      else navigate("/dashboard/patient");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>🔐 Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        New here? <Link to="/">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
