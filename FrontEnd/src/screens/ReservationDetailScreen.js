import React, { useEffect } from 'react';
import ReservationDetailForm from '../components/ReservationDetailForm';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReservationDetails } from '../actions/reservationActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ReservationDetailScreen() {
    const { id: reservationId } = useParams(); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReservationDetails(reservationId)); 
    }, [dispatch, reservationId]);

    const reservationDetails = useSelector(state => state.reservationDetails);
    const { loading, error, reservation } = reservationDetails;

    return (
        <div>
            <h2>Reservation Details</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <ReservationDetailForm reservation={reservation} />
            )}
        </div>
    );
}

export default ReservationDetailScreen;
