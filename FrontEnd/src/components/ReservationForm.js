import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReservation } from '../actions/reservationActions';

function ReservationForm() {
    const [productId, setProductId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReservation({ productId, startDate, endDate }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Product select, start date, end date inputs */}
            <button type="submit">Reserve Car</button>
        </form>
    );
}

export default ReservationForm;