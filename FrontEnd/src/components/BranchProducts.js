import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from './Product'; // Adjust the path as necessary
import Loader from './Loader'; // Adjust the path as necessary
import Message from './Message'; // Adjust the path as necessary

const BranchProducts = () => {
  const { branchId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductsByBranch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/branch/${branchId}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products by branch');
        setLoading(false);
      }
    };

    fetchProductsByBranch();
  }, [branchId]);

  return (
    <div>
      <h2>Branch Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BranchProducts;
