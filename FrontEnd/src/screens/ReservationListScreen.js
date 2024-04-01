import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listReservations } from '../actions/reservationActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom'; 
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

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

    const handleReservationDetail = (reservationId) => {
        navigate(`/api/reservations/${reservationId}`);
    };

    const handleDeleteReservation = async (reservationId) => {
        try {
            // Send a DELETE request to the backend API
            const response = await axios.delete(`/api/reservations/${reservationId}/delete`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}` // Include authorization token if needed
                }
            });
            // Handle successful deletion
            console.log('Reservation deleted successfully');
            
            // Dispatch the listReservations action again to refresh the reservation list
            dispatch(listReservations());
    
            // You may also show a success message to the user
            
        } catch (error) {
            // Handle errors
            console.error('Error deleting reservation:', error);
        }
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
                                <td>{reservation.user ? reservation.user.username : 'Unknown User'}</td> 
                                <td>{reservation.product ? reservation.product.name : 'Unknown Product'}</td> 
                                <td>{reservation.start_date}</td>
                                <td>{reservation.end_date}</td>
                                <td>
                                    <Link to={`/admin/reservation/${reservation.id}`}>See More</Link>
                                    <Button variant="danger" onClick={() => handleDeleteReservation(reservation.id)}>Delete</Button> 
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
