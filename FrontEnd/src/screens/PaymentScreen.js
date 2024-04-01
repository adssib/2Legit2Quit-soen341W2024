import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { resetReservationSuccess } from '../actions/reservationActions';
import { useDispatch } from 'react-redux';

function PaymentScreen() {
    const dispatch = useDispatch(); 
    const location = useLocation();
    const { productId, startDate, endDate } = location.state || {};

    const [transactions, setTransactions] = useState([]);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    // Fetch product details and calculate the amount
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                const days = calculateDaysBetweenDates(startDate, endDate);
                const amountDue = days * parseFloat(data.price); // Assuming price is directly on data
                setAmount(amountDue);
            } catch (error) {
                console.error("Failed to fetch product details", error);
            }
        };

        fetchProductDetails();
    }, [productId, startDate, endDate]);

    // Cleanup function to reset the reservation success state when unmounting
    useEffect(() => {
        return () => {
            dispatch(resetReservationSuccess());
        };
    }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        const paymentInfo = {
            cardName,
            cardNumber, // Consider masking this for display
            expMonth,
            expYear,
            cvv,
            amount
        };
        // Construct reservation info from state passed via navigate
        const reservationInfo = {
            productId,
            startDate,
            endDate
        };
        // Navigate to confirmation screen with state
        navigate('/confirmation', { state: { reservationInfo, paymentInfo } });
    };
    

    const handleGoBack = () => {
        navigate(-1);
    };

    

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    
                <button onClick={handleGoBack}>Go Back</button>

                    <h1>Payment Information</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="cardName">
                            <Form.Label>Cardholder's Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name on card"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Valid card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="expMonth">
                                    <Form.Label>Expiration Month</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="MM"
                                        value={expMonth}
                                        onChange={(e) => setExpMonth(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="expYear">
                                    <Form.Label>Expiration Year</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="YYYY"
                                        value={expYear}
                                        onChange={(e) => setExpYear(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Cost">
  Renting Cost for {calculateDaysBetweenDates(startDate, endDate)} day period
  <Form.Control
    type="text"
    placeholder="Amount will be calculated"
    value={typeof amount === 'number' ? `$${amount.toFixed(2)} for ${calculateDaysBetweenDates(startDate, endDate)} days + 500$ deposit= $${(amount + 500).toFixed(2)}` : 'Calculating...'}
    readOnly 
  />
</Form.Group>


                        <Button type="submit" variant="primary">Submit Payment</Button>
                    </Form>

                    {/* Transaction Table */}
                    {transactions.length > 0 && (
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Card Number</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{transaction.cardName}</td>
                                        <td>{transaction.cardNumber}</td>
                                        <td>${transaction.amount}</td>
                                        <td>{transaction.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default PaymentScreen;

function calculateDaysBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
