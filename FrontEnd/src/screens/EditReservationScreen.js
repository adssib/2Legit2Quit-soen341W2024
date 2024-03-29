import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservationDetails, updateCheckInProcess } from '../actions/reservationActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button, Form } from 'react-bootstrap';

function EditReservationScreen({ match }) {
    const reservationId = match.params.id;

    const dispatch = useDispatch();

    const [checkInData, setCheckInData] = useState({
        arrived_location: false,
        provided_license: false,
        provided_credit_card: false,
        signed_agreement: false,
        payment_received: false,
    });

    const reservationDetails = useSelector(state => state.reservationDetails);
    const { loading, error, reservation } = reservationDetails;

    useEffect(() => {
        dispatch(getReservationDetails(reservationId));
    }, [dispatch, reservationId]);

    useEffect(() => {
        if (reservation) {
            setCheckInData({
                arrived_location: reservation.arrived_location,
                provided_license: reservation.provided_license,
                provided_credit_card: reservation.provided_credit_card,
                signed_agreement: reservation.signed_agreement,
                payment_received: reservation.payment_received,
            });
        }
    }, [reservation]);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setCheckInData(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = () => {
        dispatch(updateCheckInProcess(reservationId, checkInData));
    };

    return (
        <div>
            <h1>Edit Reservation</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form>
                    <Form.Group controlId='arrived_location'>
                        <Form.Check
                            type='checkbox'
                            label='Arrived at Location'
                            name='arrived_location'
                            checked={checkInData.arrived_location}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='provided_license'>
                        <Form.Check
                            type='checkbox'
                            label='Provided License'
                            name='provided_license'
                            checked={checkInData.provided_license}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='provided_credit_card'>
                        <Form.Check
                            type='checkbox'
                            label='Provided Credit Card'
                            name='provided_credit_card'
                            checked={checkInData.provided_credit_card}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='signed_agreement'>
                        <Form.Check
                            type='checkbox'
                            label='Signed Agreement'
                            name='signed_agreement'
                            checked={checkInData.signed_agreement}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='payment_received'>
                        <Form.Check
                            type='checkbox'
                            label='Payment Received'
                            name='payment_received'
                            checked={checkInData.payment_received}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant='primary' onClick={handleSubmit}>
                        Update
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default EditReservationScreen;
