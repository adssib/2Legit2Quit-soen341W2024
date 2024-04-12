import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function AdminPayments() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { data } = await axios.get('/api/payments/list/');
                setPayments(data.map(payment => ({
                    ...payment,
                    amount: parseFloat(payment.amount)  // Parse the amount as a float
                })));
            } catch (error) {
                console.error("Failed to fetch payments:", error);
                alert("Failed to fetch payments: " + error.message);
            }
        };
        fetchPayments();
    }, []);

    const deletePayment = async (id) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                await axios.delete(`/api/payments/delete/${id}/`);
                setPayments(currentPayments => currentPayments.filter(payment => payment.id !== id));
                console.log('Payment deleted successfully');
            } catch (error) {
                console.error("Failed to delete payment:", error);
                alert("Failed to delete payment: " + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Payment List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Card Name</th>
                        <th>Card Number</th>
                        <th>Amount</th>
                        <th>Date of Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.card_name}</td>
                            <td>{payment.card_number}</td>
                            <td>${payment.amount.toFixed(2)}</td>
                            <td>{payment.date}</td>
                            <td>
                                <Button variant="danger" onClick={() => deletePayment(payment.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminPayments;
