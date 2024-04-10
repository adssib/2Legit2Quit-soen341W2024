import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from './Product'; 
import Loader from './Loader'; 
import Message from './Message'; 
import FilterBar from './FilterBar'; 
import {  fetchFilterOptions } from '../actions/productActions';

const BranchProducts = () => {
  const dispatch = useDispatch();
  const { branchId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});

  const filterOptions = useSelector(state => state.filterOptions);
  const { brands, categories, loading: filterLoading, error: filterError } = filterOptions;

  useEffect(() => {
    const fetchProductsByBranch = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams(filters).toString();
        const response = await axios.get(`/api/products/branch/${branchId}?${query}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products by branch');
        setLoading(false);
      }
    };

    fetchProductsByBranch();
    
  }, [branchId, filters]);

  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch, filters]);

  const updateFilters = (newFilter) => {
    setFilters(prevFilters => {
      const updatedFilters = {...prevFilters, ...newFilter};
      return updatedFilters;
    });
  };
  
  return (
    <div>
      <h2>Branch Products</h2>
      <FilterBar brands={brands} categories={categories} setFilters={updateFilters} products={products} />
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
