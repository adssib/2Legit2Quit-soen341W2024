import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert, Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';


function CarScreen() {

    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const handleDeleteReservation = async (reservationId) => {
        if(window.confirm("Are you sure you want to cancel this reservation? This action cannot be undone.")) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`, 
                    },
                };
                await axios.delete(`/api/reservations/${reservationId}/delete`, config);
                
                
                setReservations(prevReservations => 
                    prevReservations.filter(reservation => reservation.id !== reservationId)
                );
                console.log('Reservation deleted successfully');
            } catch (error) {
                console.error('Error deleting reservation:', error.response ? error.response.data : 'No response');
            }
        }
    };
    
    useEffect(() => {
        if (!userInfo) {
            setError('You must be logged in to see this page.');
            return;
        }

        const fetchReservations = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('/api/reservations/user-reservations/', config);
                setReservations(data);
            } catch (error) {
                setError('Failed to fetch reservations.');
            }
        };

        fetchReservations();
    }, [userInfo]);

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <h2>My Reservations</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.product_name}</td>
                            <td>{reservation.start_date}</td>
                            <td>{reservation.end_date}</td>
                            <td> 
                                <Button variant="danger" onClick={() => handleDeleteReservation(reservation.id)}>CANCEL</Button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CarScreen;
