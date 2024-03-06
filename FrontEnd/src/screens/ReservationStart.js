import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import products from '../products'; // Assuming this is your list of cars

function ReservationStart() {
    const location = useLocation();
    // Access the state passed through navigate function
    const selectedProductId = location.state?.selectedProductId;

    // States for form fields
    const [selectedCar, setSelectedCar] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // useEffect to pre-populate the form if selectedProductId is passed
    useEffect(() => {
        if (selectedProductId) {
            setSelectedCar(selectedProductId);
        } else {
            // Default to the first car if no product ID is passed
            setSelectedCar(products[0]?._id || '');
        }
    }, [selectedProductId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle reservation start
        console.log({ selectedCar, startDate, endDate });
        // Typically, here you would make an API call to save the reservation
    };

    return (
        <Container>
            <h1>Start a Reservation</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="carSelect">
                    <Form.Label>Select a Car</Form.Label>
                    <Form.Control as="select" value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Start Reservation
                </Button>
            </Form>
        </Container>
    );
}

export default ReservationStart;
