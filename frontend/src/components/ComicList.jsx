import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ComicList.css'
import '../styles/Home.css'



const ComicList = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get('https://storyverse-fpta.onrender.com/api/comics');
        setComics(response.data);
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };
    fetchComics();
  }, []);

  function ComicCard({ comic }) {
    return (
      <div className="card group position-relative bg-white rounded-lg shadow overflow-hidden transition-transform hover:translate-y-neg-1 ms-4">
        <a href={`https://storyverse-fpta.onrender.com/${comic.document}`} target="_blank" rel="noopener noreferrer">
        <div className="aspect-ratio aspect-ratio-2x3 position-relative overflow-hidden">
          <img 
            src={`https://storyverse-fpta.onrender.com/${comic.coverImage}`}
            alt={comic.title}
            className="card-img-top object-fit-cover w-100 h-100 group-hover:scale-105 transition-transform duration-300 p-1"
          />
        </div>
        <div className="card-body text-center p-4">
        <h4>{comic.title}</h4>
        </div>
        </a>
      </div>
    );
  }
  
  return (
    <>
    <section class="hero-section">
      <div className='hero-overlay'></div>
        <div class="hero-content text-start fw-bold ">
            <h1 className='fw-bolder'>Discover Amazing Comics</h1>
            <p>Read thousands of comics, manga, and manhwa online for free. Updates daily with new chapters.</p>
        </div>
        <div class="hero-decoration"></div>
    </section>
    <h3 className='ms-3 fw-bold'>Comics</h3>
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">
      {comics.map((comic) => (
        <ComicCard key={comic._id} comic={comic} />
      ))}
    </div>
    </>
  );
};

export default ComicList;