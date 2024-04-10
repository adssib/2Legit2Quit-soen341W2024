import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createReservation, resetReservationSuccess } from '../actions/reservationActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';


function ReservationStart() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedProductId = location.state?.selectedProductId;
    const [products, setProducts] = useState([]);
    const [carReservations, setCarReservations] = useState([]);
    const [selectedCar, setSelectedCar] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [includeInsurance, setIncludeInsurance] = useState(false); 
    const [includeGPS, setIncludeGPS] = useState(false); 
    const reservationCreate = useSelector((state) => state.reservationCreate);
    const { loading, error, success } = reservationCreate;
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (selectedProductId) {
            setSelectedCar(selectedProductId);
        } else {
            setSelectedCar(products[0]?._id || '');
        }
    }, [selectedProductId]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products'); 
                setProducts(data);
                setSelectedCar(selectedProductId || data[0]?._id || '');
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
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
                    includeInsurance: includeInsurance,
                    includeGPS: includeGPS
                },
            });
        }
    }, [success, navigate, selectedCar, startDate, endDate, includeInsurance, includeGPS]);

    useEffect(() => {
        const fetchReservations = async () => {
            if(selectedCar) {
                try {
                    const response = await axios.get(`/api/reservations/by_product/${selectedCar}`);
                    console.log(response.data); 
                    setCarReservations(response.data);
                } catch (error) {
                    console.error('Failed to fetch reservations:', error);
                }
            }
        };

        fetchReservations();
    }, [selectedCar]);


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
            <div>
            <h3>Existing Reservations for Selected Car</h3>
  {carReservations.length > 0 ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {carReservations.map((reservation, index) => (
          <tr key={index}>
            <td>{reservation.start_date}</td>
            <td>{reservation.end_date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <p>No active reservations for this car.</p>
  )}
</div>
        </Container>

    );
}

export default ReservationStart;
