import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';

function ReservationDetailForm({ reservation }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (reservation.user && reservation.user.email) {
            const fetchUserName = async () => {
                try {
                    // Fetch user details by email
                    const response = await axios.get(`/api/users/by-email/${reservation.user.email}`);
                    // Set userName using the name field which already concatenates first name and last name
                    setUserName(response.data.name);
                } catch (error) {
                    console.error("Could not fetch user details", error);
                    setUserName('Unknown');
                }
            };

            fetchUserName();
        }
    }, [reservation.user]);

    function generateRentalAgreement() {
        const doc = new jsPDF();

        const agreementText = `
            Rental Agreement
            ----------------
            Reservation Details:
            - Name: ${userName || 'Unknown'}
            - Start Date: ${reservation.start_date}
            - End Date: ${reservation.end_date}
            - Product: ${reservation.product_name}
    
            Terms and Conditions:
            1. The user agrees to return the car in the condition it was rented in.
            2. Any damages to the car will be the responsibility of the user.
            3. The rental period is strictly from the Start Date to the End Date as mentioned above.
    
            Signature: ______________________________
    
            Date: _______________
        `;

        // Split the agreement text by new lines and add each line to the PDF
        agreementText.split('\n').forEach((line, index) => {
            doc.text(line, 10, 10 + (index * 10));
        });

        // Save the created PDF
        doc.save(`Rental_Agreement_${new Date().toLocaleDateString()}.pdf`);
    }
    return (
        <Form>
            {/* General information */}
            <h4>General Information</h4>
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
            <p>User: {reservation.user && reservation.user.name}</p>
            <p>Product: {reservation.product_name}</p>
        
            {/* Check-in questions */}
            <h4>Check-in</h4>
            <Form.Check type="radio" label="Did the User arrive at the location?" />
            <Form.Check type="radio" label="Did he inspect and approve of the car that he rented?" />
            <Form.Check type="radio" label="Is the driver license provided the same that was rented with?" />
            <Form.Check type="radio" label="Is the credit card used the same?" />
            <Form.Check type="radio" label="Did he sign manually the agreement?" />
            <Button variant="primary" onClick={generateRentalAgreement}>Generate Rental Agreement</Button>
            {/* Checkout questions */}
            <p></p>
            <h4>Check-out</h4>
            <Form.Check type="radio" label="Is there any damages?" />
            <Form.Check type="radio" label="Did the user return to the drop off locations?" />

            {/* Submit button */}
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
}

export default ReservationDetailForm;

