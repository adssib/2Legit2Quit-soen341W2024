// In src/screens/ReservationDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function ReservationDetails() {
  let { id } = useParams(); // Getting the reservation ID from the URL

  // Here, you'd fetch the reservation details using the ID
  // For now, we'll just display the ID
  return (
    <Container>
      <h1>Reservation Details</h1>
      <p>Reservation ID: {id}</p>
      {/* Display reservation details and provide options to modify or cancel */}
    </Container>
  );
}

export default ReservationDetails;
