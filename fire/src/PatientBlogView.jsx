import { useState, useEffect } from "react";

function PatientBlogView({ category }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/blogs/category/${category}`)
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, [category]);

  const truncate = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div>
      <h2>{category} Blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{blog.title}</h3>
          <img src={blog.imageUrl} alt="Blog" width="150" />
          <p>{truncate(blog.summary, 15)}</p>
        </div>
      ))}
    </div>
  );
}

export default PatientBlogView;
