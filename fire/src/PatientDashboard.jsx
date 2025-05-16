import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.role === "Patient") setUser(parsed);
      else navigate("/login");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>👤 Patient Dashboard</h1>
      {user.profilePic && (
        <img src={user.profilePic} alt="Profile" width="100" />
      )}
      <p><strong>{user.firstName} {user.lastName}</strong></p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.addressLine1}, {user.city}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default PatientDashboard;
