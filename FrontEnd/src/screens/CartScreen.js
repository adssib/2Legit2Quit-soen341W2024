import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

function CartScreen() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        console.log('Fetching cart items from localStorage');
        // Assuming you're storing cart items in local storage under 'cartItems'
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        console.log('Stored Cart Items:', storedCartItems);
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    const removeFromCartHandler = (id) => {
        console.log(`Removing item with id: ${id}`);
        // Implement removing from cart logic
        const updatedCartItems = cartItems.filter(item => item._id !== id);
        console.log('Updated Cart Items:', updatedCartItems);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </div>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;
