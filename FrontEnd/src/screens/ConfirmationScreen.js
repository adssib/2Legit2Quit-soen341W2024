import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf';

function ConfirmationScreen() {
    const location = useLocation();
    const { state } = location; 
    const { reservationInfo, paymentInfo } = state || {}; 
    const [hasAcceptedAgreement, setHasAcceptedAgreement] = useState(false);
    const [productName, setProductName] = useState('');

    useEffect(() => {
        if (reservationInfo && reservationInfo.productId) {
            const fetchProductName = async () => {
                try {
                    const response = await axios.get(`/api/products/${reservationInfo.productId}`);
                    setProductName(response.data.name);
                } catch (error) {
                    console.error("Could not fetch product details", error);
                }
            };
            fetchProductName();
        }
    }, [reservationInfo]);

    const sendEmail = () => {
        const templateParams = {
            productName,
            startDate: reservationInfo?.startDate,
            endDate: reservationInfo?.endDate,
            cardName: paymentInfo?.cardName,
            cardNumber: paymentInfo?.cardNumber,
            amount: (parseFloat(paymentInfo.amount) + 500).toFixed(2),
            userEmail: reservationInfo?.user
           
        };

        emailjs.send('service_yqkrpgt', 'template_hw1432q', templateParams, 'suwiaWPecm3bi3qao')
            .then((response) => {
                alert('Email successfully sent!');
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                alert('Failed to send email. Check console for errors.');
                console.log('FAILED...', error);
            });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const maxWidth = pageWidth - margin * 2;
        const lineHeight = 10;
        let currentHeight = 20;
    

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Reservation Confirmation', margin, currentHeight);
        currentHeight += lineHeight;
    
        // Agreement text
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const agreementText = 'This Rental Agreement ("Agreement") is entered into between RentAcar, located at 123 Montreal, Canada, hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter."';
        const splitAgreementText = doc.splitTextToSize(agreementText, maxWidth);
        doc.text(splitAgreementText, margin, currentHeight);
        currentHeight += splitAgreementText.length * 6; 
    
        doc.setFontSize(12);
    

        const details = [
            `Car: ${productName || "Loading product name..."}`,
            `Start Date: ${reservationInfo?.startDate} at 10:00 AM`,
            `End Date: ${reservationInfo?.endDate} at 6:00 PM`,
            "Car pick up and return Location: 23213, Laval, A1B 2C3, Canada",
            `Card Name: ${paymentInfo?.cardName}`,
            `Card Number: ${paymentInfo?.cardNumber}`,
            `Amount Paid: $${(parseFloat(paymentInfo.amount) + 500).toFixed(2)}`,
        ];
    
        details.forEach(detail => {
            if (currentHeight + lineHeight > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                currentHeight = margin;
            }
            doc.text(detail, margin, currentHeight);
            currentHeight += lineHeight;
        });
    
        currentHeight += lineHeight * 2;
    
        const legalText = `The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.
    The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.
    The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.
    The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.
    The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.
    The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.
    The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.
    The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.
    
    5. Indemnification:
    
    The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.
    
    6. Governing Law:
    
    This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].
    
    7. Entire Agreement:
    
    This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.`;
        const splitLegalText = doc.splitTextToSize(legalText, maxWidth);
    
        splitLegalText.forEach((textLine) => {
            if (currentHeight > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                currentHeight = margin;
            }
            doc.text(textLine, margin, currentHeight);
            currentHeight += lineHeight;
        });
    
        doc.save('reservation-details.pdf');
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <h2>Confirmation</h2>
                    <h4>Reservation Details:</h4>
                    <p>Product: {productName || "Loading product name..."}</p>
                    <p>Start Date: {reservationInfo?.startDate} at 10:00 AM</p>
                    <p>End Date: {reservationInfo?.endDate} at 6:00PM</p>
                    <p>Car pick up and return Location: 23213, Laval, A1B 2C3, canada </p> 
                    <h4>Payment Details:</h4>
                    <p>Card Name: {paymentInfo?.cardName}</p>
                    <p>Card Number: {paymentInfo?.cardNumber}</p>
                    <p>Amount Paid: ${paymentInfo?.amount.toFixed(2)}</p>
                   <p> <Button onClick={generatePDF} style={{marginLeft: "10px"}}>Download Agreement</Button></p>
                   <div>
                <input
                    type="checkbox"
                    id="acceptAgreement"
                    checked={hasAcceptedAgreement}
                    onChange={(e) => setHasAcceptedAgreement(e.target.checked)}
                />
                <label htmlFor="acceptAgreement" style={{marginLeft: "5px"}}>
                    I have read and accepted the agreement
                </label>
            </div>
                    <Button onClick={sendEmail}>Confirm Booking</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ConfirmationScreen;
