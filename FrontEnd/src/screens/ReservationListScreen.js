import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listReservations } from '../actions/reservationActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom'; 

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

    return (
        <div>
            <h1>Reservations</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>PRODUCT</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation._id}>
                                <td>{reservation._id}</td>
                                <td>{reservation.user}</td> {/* Adjust according to your data structure */}
                                <td>{reservation.product}</td> {/* Adjust according to your data structure */}
                                <td>{reservation.start_date}</td>
                                <td>{reservation.end_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default ReservationListScreen;
