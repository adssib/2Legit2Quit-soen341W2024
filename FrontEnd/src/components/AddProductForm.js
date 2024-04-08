import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProductForm() {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        countInStock: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch branches when the component mounts
        const fetchBranches = async () => {
            try {
                const { data } = await axios.get('/api/branches/');
                setBranches(data);
            } catch (error) {
                alert('Failed to load branches');
                console.error('Error fetching branches:', error);
            }
        };

        fetchBranches();
    }, []);

    const onChange = e => {
        if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            alert("You must be logged in to add a car.");
            navigate('/login');
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);
        if (selectedBranch) data.append('branch', selectedBranch);

        try {
            await axios.post('/api/products/user/add/', data, config);
            alert('Product added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Failed to add product', error.response && error.response.data.message ? error.response.data.message : error.message);
            alert('Failed to add product. Please check your input and try again.');
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            {/* Name */}
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter car name'
                    name='name'
                    value={formData.name}
                    onChange={onChange}
                    required
                />
            </Form.Group>

            {/* Brand */}
            <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter brand'
                    name='brand'
                    value={formData.brand}
                    onChange={onChange}
                    required
                />
            </Form.Group>

            {/* Category */}
            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter category (e.g., Sedan, SUV)'
                    name='category'
                    value={formData.category}
                    onChange={onChange}
                    required
                />
            </Form.Group>

            {/* Description */}
            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter description'
                    name='description'
                    value={formData.description}
                    onChange={onChange}
                    required
                />
            </Form.Group>

            {/* Price */}
            <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='Enter price per day'
                    name='price'
                    value={formData.price}
                    onChange={onChange}
                    required
                />
            </Form.Group>

            {/* Count In Stock */}
            <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='Enter stock count'
                    name='countInStock'
                    value={formData.countInStock}
                    onChange={onChange}
                    required
                />
            </Form.Group>

            {/* Image */}
            <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type='file'
                    name='image'
                    onChange={onChange}
                />
            </Form.Group>

            {/* Branch Selection */}
            <Form.Group controlId='branch'>
                <Form.Label>Branch</Form.Label>
                <Form.Control
                    as='select'
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    required
                >
                    <option value=''>Select a branch</option>
                    {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                            {branch.branch_name} - {branch.address}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Add Car
            </Button>
        </Form>
    );
}

export default AddProductForm;
