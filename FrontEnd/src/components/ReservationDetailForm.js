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
        agreementText.split('\n').forEach((line, index) => {
            doc.text(line, 10, 10 + (index * 10));
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
