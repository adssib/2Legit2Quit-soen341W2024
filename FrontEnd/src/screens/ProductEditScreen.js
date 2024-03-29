import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PaymentScreen() {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: Add your payment processing logic here
        console.log({ cardName, cardNumber, expMonth, expYear, cvv });
        alert('Payment info submitted');
        navigate('/'); // Redirect to the homepage
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
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

                        <Button type="submit" variant="primary">
                            Submit Payment
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default PaymentScreen;
