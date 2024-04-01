import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

function ConfirmationScreen() {
    const location = useLocation();
    const { state } = location; // Access state from location
    const { reservationInfo, paymentInfo } = state || {}; // Assuming reservationInfo and paymentInfo are passed correctly

    const [productName, setProductName] = useState('');

    useEffect(() => {
        // Check if reservationInfo and reservationInfo.productId are available
        if (reservationInfo && reservationInfo.productId) {
            const fetchProductName = async () => {
                try {
                    // Use reservationInfo.productId instead of undefined productId
                    const response = await axios.get(`/api/products/${reservationInfo.productId}`);
                    setProductName(response.data.name);
                } catch (error) {
                    console.error("Could not fetch product details", error);
                }
            };

            fetchProductName();
        }
    }, [reservationInfo]); // Use reservationInfo as the dependency

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <h2>Confirmation</h2>
                    <h4>Reservation Details:</h4>
                    <p>Product: {productName || "Loading product name..."}</p>
                    <p>Start Date: {reservationInfo?.startDate}</p>
                    <p>End Date: {reservationInfo?.endDate}</p>
                    <h4>Payment Details:</h4>
                    <p>Card Name: {paymentInfo?.cardName}</p>
                    <p>Card Number: {paymentInfo?.cardNumber}</p>
                    <p>Amount Paid: ${paymentInfo?.amount.toFixed(2)}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default ConfirmationScreen;
