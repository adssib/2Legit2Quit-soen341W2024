import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import products from '../products';

function SearchScreen() {
  let { keyword } = useParams(); // Get keyword from URL
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      <h1>Search Results</h1>
      <Row>
        {filteredProducts.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SearchScreen;
