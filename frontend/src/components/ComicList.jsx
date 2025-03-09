import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ComicList = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      const response = await axios.get('https://storyverse-fpta.onrender.com/comics');
      setComics(response.data);
    };
    fetchComics();
  }, []);

  return (
    <div className="container">
      {/* <h1>Comics</h1> */}
      <div className="comic-grid">
        {comics.map((comic) => (
          <div key={comic._id} className="comic-card">
            <Link to={`/comics/${comic._id}`}>
              <img src={`http://localhost:5000/${comic.coverImage}`} alt={comic.title} />
              <h3>{comic.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicList;