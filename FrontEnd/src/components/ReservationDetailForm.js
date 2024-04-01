import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ReservationDetailForm({ reservation }) {
    return (
        <Form>
            {/* General information */}
            <h4>General Information</h4>
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
            <p>User: {reservation.user && reservation.user.name}</p>
            <p>
                Product: {reservation.product && (
                    <Link to={`/products/${reservation.product._id}`}>{reservation.product.name}</Link>
                )}
            </p>
            {/* Check-in questions */}
            <h4>Check-in</h4>
            <Form.Check type="radio" label="Did the User arrive at the location?" />
            <Form.Check type="radio" label="Did he inspect and approve of the car that he rented?" />
            <Form.Check type="radio" label="Is the driver license provided the same that was rented with?" />
            <Form.Check type="radio" label="Is the credit card used the same?" />
            <Form.Check type="radio" label="Did he sign manually the agreement?" />
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
