import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const [user, setUser] = useState(null);
  const [myBlogs, setMyBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: "",
    imageUrl: "",
    category: "Mental Health",
    summary: "",
    content: "",
    draft: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.role === "Doctor") {
        setUser(parsed);
        fetchBlogs(parsed.username);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchBlogs = async (username) => {
    const res = await fetch(`http://localhost:8080/blogs/doctor/${username}`);
    const data = await res.json();
    setMyBlogs(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogForm({
      ...blogForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBlogSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    ...blogForm,
    doctorUsername: user.username,
  };

  const res = await fetch("http://localhost:8080/blogs/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    alert("Blog posted!");
    setBlogForm({
      title: "",
      imageUrl: "",
      category: "Mental Health",
      summary: "",
      content: "",
      draft: false,
    });
    fetchBlogs(user.username);
  } else {
    alert("Failed to post blog.");
  }
};


  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>🩺 Doctor Dashboard</h1>
      {user.profilePic && (
        <img src={user.profilePic} alt="Profile" width="100" />
      )}
      <p><strong>Dr. {user.firstName} {user.lastName}</strong></p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.addressLine1}, {user.city}</p>
      <button onClick={handleLogout}>Logout</button>

      <hr />
      <h2>📝 Create Blog Post</h2>
      <form onSubmit={handleBlogSubmit}>
        <input name="title" placeholder="Title" value={blogForm.title} onChange={handleChange} required /><br />
        <input name="imageUrl" placeholder="Image URL" value={blogForm.imageUrl} onChange={handleChange} /><br />
        <select name="category" value={blogForm.category} onChange={handleChange}>
          <option>Mental Health</option>
          <option>Heart Disease</option>
          <option>Covid19</option>
          <option>Immunization</option>
        </select><br />
        <textarea name="summary" placeholder="Summary" value={blogForm.summary} onChange={handleChange} required /><br />
        <textarea name="content" placeholder="Content" value={blogForm.content} onChange={handleChange} required /><br />
        <label>
          <input type="checkbox" name="draft" checked={blogForm.draft} onChange={handleChange} />
          Save as Draft
        </label><br />
        <button type="submit">Upload Blog</button>
      </form>

      <hr />
      <h2>📚 My Blog Posts</h2>
      {myBlogs.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        myBlogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <img src={blog.imageUrl} alt="Blog" width="200" />
            <p><strong>Category:</strong> {blog.category}</p>
            <p><strong>Summary:</strong> {blog.summary}</p>
            <p><strong>Status:</strong> {blog.draft ? "Draft" : "Published"}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorDashboard;
