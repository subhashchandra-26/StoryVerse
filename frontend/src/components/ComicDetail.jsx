import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ComicDetail = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await axios.get(`https://storyverse-fpta.onrender.com/api/comics/${id}`);
        setComic(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comic:', error);
        setError('Failed to fetch comic details.');
        setLoading(false);
      }
    };

    fetchComic();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!comic) return <div>Comic not found.</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{comic.title}</h1>
      <div>
        {/* <img
          src={`https://storyverse-fpta.onrender.com/${comic.coverImage}`}
          alt={comic.title}
          className="card-img-top"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        /> */}
        <div>
          <p>{comic.description}</p>
        </div>
      </div>

      {/* Display the comic document directly */}
      <div className="mt-4">
        <h3>Comic Document</h3>
        <iframe
          src={`https://storyverse-fpta.onrender.com/${comic.document}`}
          width="90%"
          height="900px"
          style={{ border: 'none' }}
          title="Comic Document"
        />
      </div>
    </div>
  );
};

export default ComicDetail;