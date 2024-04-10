import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Alert } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

function SearchScreen() {
  let { keyword } = useParams(); 
  const [products, setProducts] = useState([]); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/search/${keyword}`); 
        setProducts(data);
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Search fetch error:', error);
      }
    };

    if (keyword) {
      fetchProducts();
    }
  }, [keyword]);

  return (
    <div>
      <h1>Search Results for "{keyword}"</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {products.length > 0 ? (
          products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No products found matching your criteria.</Alert>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default SearchScreen;
