import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ComicDetail = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      const response = await axios.get(`https://storyverse-fpta.onrender.com/comics/${id}`);
      setComic(response.data);
    };
    fetchComic();
  }, [id]);

  if (!comic) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{comic.title}</h1>
      <img src={`http://localhost:5000/${comic.coverImage}`} alt={comic.title} />
      <p>{comic.description}</p>
      <a href={`http://localhost:5000/${comic.document}`} target="_blank" rel="noopener noreferrer">
        Read Comic
      </a>
    </div>
  );
};

export default ComicDetail;