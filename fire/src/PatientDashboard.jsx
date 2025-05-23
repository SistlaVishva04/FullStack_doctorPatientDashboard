import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const [user, setUser] = useState(null);
  const [blogsByCategory, setBlogsByCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.role === "Patient") {
        setUser(parsed);
        fetchBlogs();
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:8080/blogs");
    const data = await res.json();

    const grouped = data.reduce((acc, blog) => {
      if (!blog.draft) {
        if (!acc[blog.category]) acc[blog.category] = [];
        acc[blog.category].push(blog);
      }
      return acc;
    }, {});

    setBlogsByCategory(grouped);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const truncateSummary = (summary) => {
    const words = summary.split(" ");
    return words.length <= 15 ? summary : words.slice(0, 15).join(" ") + " ...";
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

      <hr />
      <h2>📰 Health Blogs</h2>
      {Object.keys(blogsByCategory).length === 0 ? (
        <p>No published blogs yet.</p>
      ) : (
        Object.entries(blogsByCategory).map(([category, blogs]) => (
          <div key={category}>
            <h3>📂 {category}</h3>
           {blogs.map((blog) => (
  <div key={blog.id} style={{ marginBottom: "20px" }}>
    <h4>{blog.title}</h4>
    {blog.imageUrl && (
      <img src={blog.imageUrl} alt={`Image for ${blog.title}`} width="200" style={{ display: "block", marginBottom: "10px" }} />
    )}
    <p>{truncateSummary(blog.summary)}</p>
    <hr />
  </div>
))}
          </div>
        ))
      )}
    </div>
  );
}

export default PatientDashboard;
