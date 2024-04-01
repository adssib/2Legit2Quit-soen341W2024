import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentScreen() {
    const [transactions, setTransactions] = useState([]);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const newTransaction = {
            cardName,
            cardNumber: cardNumber.replace(/.(?=.{4})/g, '*'), // Mask all but the last four digits
            expMonth,
            expYear,
            cvv,
            amount,
            date: new Date().toISOString().slice(0, 10) // Store only the date part
        };

        
        setTransactions([...transactions, newTransaction]);
        console.log("Payment Details:", newTransaction);
        // Here you would typically send this data to your backend for processing
        navigate('/'); // Redirect to the homepage or to a confirmation page
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

                        <Form.Group controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
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
