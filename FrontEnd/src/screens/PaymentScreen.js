import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { resetReservationSuccess } from '../actions/reservationActions';
import { useDispatch } from 'react-redux';

function PaymentScreen() {
    const dispatch = useDispatch(); 
    const location = useLocation();
    const { productId, startDate, endDate, includeInsurance, includeGPS } = location.state || {};

    const [transactions, setTransactions] = useState([]);
    const [cardName, setCardName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
    const fetchProductDetails = async () => {
        try {
            const { data } = await axios.get(`/api/products/${productId}`);
            const days = calculateDaysBetweenDates(startDate, endDate);
            let baseAmount = days * parseFloat(data.price); 
            let totalAmount = baseAmount + 500; 
            if (includeInsurance) {
                totalAmount += 100; 
            }
            if (includeGPS) {
                totalAmount += 50; 
            }
            setAmount(totalAmount); 
        } catch (error) {
            console.error("Failed to fetch product details", error);
        }
    };

    fetchProductDetails();
}, [productId, startDate, endDate, includeInsurance, includeGPS]);

    

    
    useEffect(() => {
        return () => {
            dispatch(resetReservationSuccess());
        };
    }, [dispatch]);

    const submitHandler = async (e) => {
        e.preventDefault();
        let totalAmount = parseFloat(amount); 
        if (includeInsurance) {
            totalAmount += 100; 
        }
        if (includeGPS) {
            totalAmount += 50; 
        }
        totalAmount += 500; 
    
        const paymentInfo = {
            card_name: cardName,
            card_number: cardNumber, 
            exp_month: expMonth,
            exp_year: expYear,
            cvv: cvv, 
            amount: totalAmount,
            date: new Date().toISOString().slice(0, 10)
        };
    
        try {
            const response = await axios.post('/api/payments/create/', paymentInfo);
            console.log('Payment successful:', response.data);
            
            navigate('/confirmation', { state: { reservationInfo: {
                productId,
                startDate,
                endDate,
                user: email
            }, paymentInfo } }); 
        } catch (error) {
            console.error('Payment failed:', error.response ? error.response.data : 'No response');
        }
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
    <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
    </Form.Group>
    <Form.Group controlId="cardNumber">
    <Form.Label>Card Number</Form.Label>
    <Form.Control
        type="text"
        placeholder="Valid card number"
        value={cardNumber}
        onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 16); // Allow only digits and limit to 16 characters
            setCardNumber(value);
        }}
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
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 2); // Allow only digits and limit to 2 characters
                    setExpMonth(value);
                }}
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
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4); // Allow only digits and limit to 4 characters
                    setExpYear(value);
                }}
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
        onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 3); // Allow only digits and limit to 3 characters
            setCvv(value);
        }}
        required
    />
</Form.Group>
    <Form.Group controlId="Cost">
        <Form.Label>Renting Cost for {calculateDaysBetweenDates(startDate, endDate)} day period</Form.Label>
        <Form.Control
            type="text"
            placeholder="Total amount will be calculated"
            value={typeof amount === 'number' ?
                `$${amount.toFixed(2)} for ${calculateDaysBetweenDates(startDate, endDate)} day(s)${(includeInsurance ? " + $100 insurance" : "")}${(includeGPS ? " + $50 GPS" : "")} + $500 deposit = $${(amount + 500 + (includeInsurance ? 100 : 0) + (includeGPS ? 50 : 0)).toFixed(2)}`
                : 'Calculating...'}
            readOnly
        />
    </Form.Group>
    <Button 
    type="submit" 
    variant="primary"
    disabled={cardNumber.length !== 16 || cvv.length !== 3 || expYear < 2024}>
    Confirm Payment
</Button>
</Form>


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
