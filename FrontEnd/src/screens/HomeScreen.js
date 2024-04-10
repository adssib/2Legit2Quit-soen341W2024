import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Item } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, fetchFilterOptions } from '../actions/productActions';
import FilterBar from '../components/FilterBar';
import { listBranches } from '../actions/branchActions';

function HomeScreen() {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({});
    const productList = useSelector(state => state.productList);
    const branchList = useSelector(state => state.branchList);
    const filterOptions = useSelector(state => state.filterOptions);
    const { error, loading, products } = productList;
    const { brands, categories, loading: filterLoading, error: filterError } = filterOptions;
    

    useEffect(() => {
        dispatch(fetchFilterOptions());
        dispatch(listProducts(filters));
    }, [dispatch, filters]);

    const updateFilters = (newFilter) => {
      console.log("Updating filters with:", newFilter);
      setFilters(prevFilters => {
          const updatedFilters = {...prevFilters, ...newFilter};
          console.log("Updated filters:", updatedFilters);
          return updatedFilters;
      });
  };
  
  

  

  return (
        <div>
            <h1>Latest Cars</h1>
            <Row>
                <Col md={3}>
                    <FilterBar brands={brands} categories={categories} setFilters={updateFilters} />
                </Col>
                <Col md={9}>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default HomeScreen;
