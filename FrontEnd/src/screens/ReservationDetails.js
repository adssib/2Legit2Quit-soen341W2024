// In src/screens/ReservationDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function ReservationDetails() {
  let { id } = useParams(); //to get the reservation ID from the URL

  return (
    <Container>
      <h1>Reservation Details</h1>
      <p>Reservation ID: {id}</p>
    </Container>
  );
}

export default ReservationDetails;
