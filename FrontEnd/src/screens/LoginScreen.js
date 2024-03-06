import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // Implement login logic here
        console.log(email, password);
        // After login, you can redirect the user as needed
        navigate('/');
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Sign In</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Sign In
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to='/create-account'>Create an account</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginScreen;
