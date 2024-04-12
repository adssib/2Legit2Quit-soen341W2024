import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';

function ReservationDetailForm({ reservation }) {
    const [userName, setUserName] = useState('');
    const [userArrived, setUserArrived] = useState(false);
    const [carInspected, setCarInspected] = useState(false);
    const [licenseConfirmed, setLicenseConfirmed] = useState(false);
    const [creditCardConfirmed, setCreditCardConfirmed] = useState(false);
    const [agreementSigned, setAgreementSigned] = useState(false);
    const [noDamages, setNoDamages] = useState(false);
    const [returnedToLocation, setReturnedToLocation] = useState(false);
    const [formError, setFormError] = useState('');
    const [agreementGenerated, setAgreementGenerated] = useState(false);


    useEffect(() => {
        if (reservation.user && reservation.user.email) {
            const fetchUserName = async () => {
                try {
                    const response = await axios.get(`/api/users/by-email/${reservation.user.email}`);
                    setUserName(response.data.name);
                } catch (error) {
                    console.error("Could not fetch user details", error);
                    setUserName('Unknown');
                }
            };

            fetchUserName();
        }
    }, [reservation.user]);

    function handleFormSubmit(event) {
        event.preventDefault();
        if (!userArrived || !carInspected || !licenseConfirmed || !creditCardConfirmed || !agreementSigned) {
            setFormError("Please confirm all check-in procedures before submission.");
            return;
        }
        if (!noDamages || !returnedToLocation) {
            setFormError("Please confirm all check-out procedures before submission.");
            return;
        }
        setFormError('');
        alert('Form submitted successfully!');
    }

    function generateRentalAgreement() {
    const doc = new jsPDF();

    // Set the title
    doc.setFontSize(18); // Larger font size for the title
    doc.setFont("helvetica", "bold"); // Bold Helvetica font
    doc.text("RENTAL AGREEMENT", 105, 20, null, null, 'center'); // Center the title on the page
    doc.setFontSize(12); // Reset font size for body text
    doc.setFont("helvetica", "normal"); // Normal weight for regular text

    // Define the agreement text
    const agreementText = `
        Reservation Details:
        - Name: ${userName || 'Unknown'}
        - Start Date: ${reservation.start_date}
        - End Date: ${reservation.end_date}
        - Product: ${reservation.product_name}

        Terms and Conditions:
        1. The user agrees to return the car in the condition it was rented.
        2. Any damages to the car will be the responsibility of the user.
        3. The rental period is strictly from the Start Date to the End Date as mentioned above.

        4. Rental Terms and Conditions:
        The Renter acknowledges receiving the vehicle in good condition and agrees to return it in the same state, subject to normal wear and tear. The Renter agrees to use the vehicle solely for personal or business purposes and not for illegal activities. Additional charges may apply for exceeding mileage limits, late returns, or other damages. The Renter will bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period. The Renter is responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and will reimburse the Rental Company for repair or replacement costs. The Renter must return the vehicle to the designated location on time; failure to do so may result in additional charges. The Rental Company may terminate this agreement and repossess the vehicle if the Renter breaches any terms.

        5. Indemnification:
        The Renter agrees to indemnify and hold harmless the Rental Company from any liabilities arising from the use of the vehicle.

        6. Governing Law:
        This Agreement is governed by the laws of [Jurisdiction]. Disputes will be resolved in local courts.

        7. Entire Agreement:
        This document supersedes all prior understandings and constitutes the entire agreement between the parties.

        8. Signatures:
        Rental Company:
        Signature: ___________________________
        Print Name: __________________________
        Date: _______________________________

        Renter:
        Signature: ___________________________
        Print Name: __________________________
        Date: _______________________________
    `;

    const lines = doc.splitTextToSize(agreementText, 180); // Split the text into lines that fit the width of the PDF
    let yPosition = 30; // Start text below the title

    lines.forEach((line, index) => {
        if (yPosition > 280) { // Check if the current position is near the bottom of the page
            doc.addPage(); // Add a new page
            yPosition = 10; // Reset position to the top of the new page
        }
        if (line.includes(':') || line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.')) {
            yPosition += 7; // Add extra space before new sections and items
        }
        doc.text(line, 10, yPosition);
        yPosition += 7; // Adjust line spacing to 7 for better readability
    });

    doc.save(`Rental_Agreement_${new Date().toLocaleDateString()}.pdf`);
    setAgreementGenerated(true);
}

    

    return (
        <Form onSubmit={handleFormSubmit}>
            <h4>General Information</h4>
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
            <p>User: {userName}</p>
            <p>Product: {reservation.product_name}</p>
    
            <h4>Check-in</h4>
            <Form.Check 
                type="checkbox" 
                label="Did the User arrive at the location?" 
                checked={userArrived} 
                onChange={e => setUserArrived(e.target.checked)} 
            />
            <Form.Check 
                type="checkbox" 
                label="Did he inspect and approve of the car that he rented?" 
                checked={carInspected} 
                onChange={e => setCarInspected(e.target.checked)} 
            />
            <Form.Check 
                type="checkbox" 
                label="Is the driver license provided the same that was rented with?" 
                checked={licenseConfirmed} 
                onChange={e => setLicenseConfirmed(e.target.checked)} 
            />
            <Form.Check 
                type="checkbox" 
                label="Is the credit card used the same?" 
                checked={creditCardConfirmed} 
                onChange={e => setCreditCardConfirmed(e.target.checked)} 
            />
            <Form.Check 
                type="checkbox" 
                label="Did he sign manually the agreement?" 
                checked={agreementSigned} 
                onChange={e => setAgreementSigned(e.target.checked)} 
            />
    
            <Button 
                variant="primary" 
                onClick={generateRentalAgreement} 
                disabled={!userArrived || !carInspected || !licenseConfirmed || !creditCardConfirmed || !agreementSigned}
            >
                Generate Rental Agreement
            </Button>
    
            <h4>Check-out</h4>
            <Form.Check 
                type="checkbox" 
                label="Is there any damages?" 
                checked={noDamages} 
                onChange={e => setNoDamages(e.target.checked)} 
            />
            <Form.Check 
                type="checkbox" 
                label="Did the user return to the drop off locations?" 
                checked={returnedToLocation} 
                onChange={e => setReturnedToLocation(e.target.checked)} 
            />
    
            {formError && <Alert variant="danger">{formError}</Alert>}
            <Button 
    variant="primary" 
    type="submit"
    disabled={!agreementGenerated || !noDamages || !returnedToLocation}
>
    Submit
</Button>
        </Form>
    );
}

export default ReservationDetailForm;
