import React, { useState } from 'react';
import axios from 'axios';

const AddComic = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [document, setDocument] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('coverImage', coverImage); // Append the cover image file
    formData.append('document', document); // Append the PDF file
    console.log(...formData)
  
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await axios.post('http://localhost:5000/api/comics', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Comic uploaded successfully!');
      console.log(response.data); // Log the response for debugging
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Add Comic</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => setDocument(e.target.files[0])}
            required
          />
          <button type="submit" className="btn btn-primary">
            Upload Comic
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComic;