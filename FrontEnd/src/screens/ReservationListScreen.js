import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listReservations } from '../actions/reservationActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom'; 
import { Table, Button } from 'react-bootstrap';

function ReservationListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const reservationList = useSelector(state => state.reservationList);
    const { loading, error, reservations } = reservationList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listReservations());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo]);

    //CHANGE THE BUTTON FUNCTIONALITY HERE
    const handleCheckIn = (reservationId) => {
        console.log(`Checking in reservation with ID: ${reservationId}`);
        
    };

    const handleCheckOut = (reservationId) => {
        console.log(`Checking out reservation with ID: ${reservationId}`);
        
    };

    return (
        <div>
            <h1>Reservations</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>USER</th>
                            <th>PRODUCT</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation._id}>
                                <td>{reservation.user ? reservation.user.username : 'Unknown User'}</td> {/* Accessing username property */}
                                <td>{reservation.product ? reservation.product.name : 'Unknown Product'}</td> {/* Accessing name property */}
                                <td>{reservation.start_date}</td>
                                <td>{reservation.end_date}</td>
                                <td>
                                    <Button variant="success" className="mr-2" onClick={() => handleCheckIn(reservation._id)}>Check In</Button> 
                                    <Button variant="warning" onClick={() => handleCheckOut(reservation._id)}>Check Out</Button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default ReservationListScreen;
