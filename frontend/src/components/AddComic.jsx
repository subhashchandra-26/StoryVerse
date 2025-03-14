import React, { useState } from 'react';
import axios from 'axios';

const AddComic = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate files
    if (!coverImage || !document) {
      setError('Please upload both a cover image and a document.');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('coverImage', coverImage);
    formData.append('document', document);

    // Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to upload a comic.');
        return;
      }

      const response = await axios.post('https://storyverse-fpta.onrender.com/api/comics', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset form and show success message
      setTitle('');
      setDescription('');
      setCoverImage(null);
      setDocument(null);
      setError('');
      alert('Comic uploaded successfully!');
      console.log(response.data); // Log the response for debugging
    } catch (error) {
      console.error('Error uploading comic:', error);
      setError('Failed to upload comic. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Add Comic</h2>
        {error && <div className="alert alert-danger">{error}</div>}
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
            onChange={(e) => {
              console.log('Cover Image Selected:', e.target.files[0]);
              setCoverImage(e.target.files[0]);
            }}
            required
          />
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => {
              console.log('Document Selected:', e.target.files[0]);
              setDocument(e.target.files[0]);
            }}
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