import axios from 'axios';
import './index.css';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 21;

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);  // Initializing with 1 instead of []
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = async (pageNum) => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${searchInput.current.value
        }&page=${pageNum}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY
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
    fetchImages(1);  // Reset to page 1 on new search
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages(1);  // Reset to page 1 on selection
  };

  const changePage = (newPage) => {
    setPage(newPage);
    fetchImages(newPage);
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
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className='image'
          />
        ))}
      </div>
      <div className="buttons">
        {page > 1 && (
          <Button onClick={() => changePage(page - 1)}>Previous</Button>
        )}
        {page < totalPages && (
          <Button onClick={() => changePage(page + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
}

export default App;
