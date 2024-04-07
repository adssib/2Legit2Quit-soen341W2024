import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProductForm() {
    // Image state
    const [image, setImage] = useState('');

    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        countInStock: '',
    });

    const navigate = useNavigate();

    const { name, brand, category, description, price, countInStock } = formData;

    // Handle form and file changes
    const onChange = e => {
        if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Submit form data
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
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

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
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter car name" name="name" value={name} onChange={onChange} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter brand" name="brand" value={brand} onChange={onChange} required />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control placeholder="SUV, Sedan, etc." name="category" value={category} onChange={onChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={description} onChange={onChange} required />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter price per day" name="price" value={price} onChange={onChange} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCountInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type="number" placeholder="Enter stock count" name="countInStock" value={countInStock} onChange={onChange} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={onChange} />
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Add Car
            </Button>
        </Form>
    );
}

export default AddProductForm;
