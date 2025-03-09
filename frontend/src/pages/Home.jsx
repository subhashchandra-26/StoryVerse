import React from 'react';
import ComicList from '../components/ComicList';

const Home = () => {
  return (
    <div>
      {/* <header className="header">
        <h1>Comic Platform</h1>
      </header> */}
     <div className='p-2'>
        <h2>Featured Comics</h2>
     </div>
      <ComicList />
    </div>
  );
};

export default Home;