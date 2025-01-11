import axios from 'axios';
import './index.css';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY
        }`
      );
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <div className="container">
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='type something to search..'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="filters">
        <div className='box' onClick={() => handleSelection('nature')}>Nature</div>
        <div className='box' onClick={() => handleSelection('birds')}>Birds</div>
        <div className='box' onClick={() => handleSelection('cats')}>Cats</div>
        <div className='box' onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>
      <div className="images">
        {images.map((image) => {
          return (<img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className='image'
          />
          );
        })}
      </div>
    </div>
  );
}

export default App;
