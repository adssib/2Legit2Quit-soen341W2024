import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyListings() {
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyListings();
    }, []);

    const fetchMyListings = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            alert("You must be logged in to see your listings.");
            navigate('/login');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        try {
            const { data } = await axios.get('/api/products/mylistings', config);
            setListings(data);
        } catch (error) {
            console.error('Failed to fetch listings', error.response && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            try {
                await axios.delete(`/api/products/delete/${id}`, config);
                setListings(listings.filter((listing) => listing._id !== id));
                alert('Car deleted successfully!');
            } catch (error) {
                console.error('Failed to delete the car', error.response && error.response.data.message ? error.response.data.message : error.message);
                alert('Failed to delete the car. Please try again.');
            }
        }
    };

    return (
        <Container>
            <h2 className="text-center mb-4">My Listings</h2>
            <Row className="d-flex justify-content-center">
                {listings.map((listing) => (
                    <Col key={listing._id} sm={12} md={6} lg={4} xl={3} className="mb-3">
                        <Card className="h-100">
                            <Card.Img variant="top" src={listing.image} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{listing.name}</Card.Title>
                                <Card.Text>{listing.description}</Card.Text>
                                <Button variant="primary" onClick={() => navigate(`/product/${listing._id}`)}>View Listing</Button>
                                <Button variant="danger" className="mt-2" onClick={() => deleteHandler(listing._id)}>Remove Car</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MyListings;
