import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import products from '../products';
import { useSelector, useDispatch } from 'react-redux';
import { createReservation, resetReservationSuccess } from '../actions/reservationActions';
import { useNavigate } from 'react-router-dom';


function ReservationStart() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedProductId = location.state?.selectedProductId;

    // States for form fields
    const [selectedCar, setSelectedCar] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [includeInsurance, setIncludeInsurance] = useState(false); // State for insurance checkbox
    const [includeGPS, setIncludeGPS] = useState(false); // State for GPS checkbox
  // Redux state for handling reservation
    const reservationCreate = useSelector((state) => state.reservationCreate);
    const { loading, error, success } = reservationCreate;

    useEffect(() => {
        if (selectedProductId) {
            setSelectedCar(selectedProductId);
        } else {
            setSelectedCar(products[0]?._id || '');
        }
    }, [selectedProductId]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedStartDate = startDate.split('T')[0];
        const formattedEndDate = endDate.split('T')[0];

        if (!formattedStartDate || !formattedEndDate) {
            alert('Please select both start and end dates.');
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDateObj = new Date(formattedStartDate);
        const endDateObj = new Date(formattedEndDate);

        if (startDateObj < today || endDateObj < today) {
            alert('Reservation dates cannot be in the past.');
            return;
        }
        if (startDateObj > endDateObj) {
            alert('Start date cannot be after the end date.');
            return;
        }

        dispatch(createReservation({
            product: selectedCar,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
        }));
    };
    useEffect(() => {
        if (success ) {
            dispatch(resetReservationSuccess());
            navigate('/payment', {
                state: {
                    productId: selectedCar,
                    startDate: startDate,
                    endDate: endDate,
                },
            });
        }
    }, [success, navigate, selectedCar, startDate, endDate]);
    return (
        <Container>
            <h1>Start a Reservation</h1>
            <p>The reservation will start at 10 AM on the Start date and end at 6PM on the end date.</p>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Reservation created successfully!</Alert>}
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
                <Form.Group controlId="insuranceCheckbox">
                    <Form.Check 
                        type="checkbox" 
                        label="Include Insurance (+100$)" 
                        checked={includeInsurance} 
                        onChange={(e) => setIncludeInsurance(e.target.checked)} 
                    />
                </Form.Group>
                <Form.Group controlId="gpsCheckbox">
                    <Form.Check 
                        type="checkbox" 
                        label="Include GPS (+50$)" 
                        checked={includeGPS} 
                        onChange={(e) => setIncludeGPS(e.target.checked)} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    Start Reservation
                </Button>
            </Form>
        </Container>
    );
}

export default ReservationStart;
