import { useState } from "react";

function DoctorBlogForm({ username }) {
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    category: "",
    summary: "",
    content: "",
    draft: false,
    doctorUsername: username
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/blogs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert("Blog posted successfully!");
    } else {
      alert("Failed to post blog");
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} /><br />
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} /><br />
        <select name="category" onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Heart Disease">Heart Disease</option>
          <option value="Covid19">Covid19</option>
          <option value="Immunization">Immunization</option>
        </select><br />
        <textarea name="summary" placeholder="Summary" onChange={handleChange} /><br />
        <textarea name="content" placeholder="Content" onChange={handleChange} /><br />
        <label>
          Draft:
          <input type="checkbox" name="draft" onChange={handleChange} />
        </label><br />
        <button type="submit">Post Blog</button>
      </form>
    </div>
  );
}

export default DoctorBlogForm;
