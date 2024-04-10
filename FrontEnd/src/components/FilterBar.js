import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col, Form, Button, Alert } from 'react-bootstrap';
import { listBranches } from '../actions/branchActions';
import PropTypes from 'prop-types';

const FilterBar = ({ brands = [], categories = [], setFilters }) => {
    const dispatch = useDispatch();
    const branchList = useSelector(state => state.branchList);
    const { branches } = branchList;
    const [selectedBranch, setSelectedBranch] = useState('');
    const [activeBrand, setActiveBrand] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(listBranches());
    }, [dispatch]);

    const handleSelectBranch = (branchId) => {
        setSelectedBranch(branchId);
        setFilters({ branch: branchId });
    };

    const selectBrand = (brand) => {
        setActiveBrand(brand);
        setFilters({ brand });
    };

    const selectCategory = (category) => {
        setActiveCategory(category);
        setFilters({ category });
    };

    const applyPriceFilter = () => {
        if (minPrice && maxPrice) {
            setFilters({ price_min: minPrice, price_max: maxPrice });
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter both minimum and maximum price values.');
        }
    };

    const resetFilters = () => {
        
        window.location.reload();
    };

    return (
        <div>
            <Col md={3}>
                <h4>Branch</h4>
                <ListGroup variant="flush">
                    {branches.map((branch) => (
                        <ListGroup.Item
                            key={branch._id}
                            action
                            onClick={() => handleSelectBranch(branch._id)}
                            active={branch._id === selectedBranch}
                        >
                            {branch.branch_name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>

            <h4>Brands</h4>
            <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => selectBrand('')} active={activeBrand === ''}>
                    All Brands
                </ListGroup.Item>
                {brands.map(brand => (
                    <ListGroup.Item
                        key={brand}
                        action
                        onClick={() => selectBrand(brand)}
                        active={activeBrand === brand}
                    >
                        {brand}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <h4>Categories</h4>
            <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => selectCategory('')} active={activeCategory === ''}>
                    All Categories
                </ListGroup.Item>
                {categories.map(category => (
                    <ListGroup.Item
                        key={category}
                        action
                        onClick={() => selectCategory(category)}
                        active={activeCategory === category}
                    >
                        {category}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <h4>Price Range</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" />
                </Form.Group>
                <Button variant="outline-primary" onClick={applyPriceFilter} disabled={!minPrice || !maxPrice}>Apply</Button>
                <Button variant="outline-secondary" onClick={resetFilters} className="ml-2">Reset Filters</Button>
                {errorMessage && <Alert variant="warning" className="mt-2">{errorMessage}</Alert>}
            </Form>
        </div>
    );
};

FilterBar.propTypes = {
    brands: PropTypes.array,
    categories: PropTypes.array,
    branches: PropTypes.array,
    setFilters: PropTypes.func.isRequired,
};

export default FilterBar;
