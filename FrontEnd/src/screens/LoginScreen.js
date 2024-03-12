import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Updated to use useLocation
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For programmatically navigating
    const location = useLocation(); // Get access to the location object

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect); // Use navigate for redirection
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
            


           <FormContainer> 
                 <h1 > Sign In</h1>

                 {error && <Message variant='danger' >{error} </Message>}

                {loading  && <oader/>}


                 <Form onSubmit={submitHandler} > 


                 < Form.Group controlId='email' > 
                         <Form.Label > Email Address </Form.Label>
                             <Form.Control
                 
                 type = 'email'
                 placeholder='Enter Email'
                 value={email}
                 onChange={ (e) => setEmail(e.target.value)}
                 >  
                             </Form.Control>
                         </Form.Group>


                 < Form.Group controlId='password' > 
                        <Form.Label > Password </Form.Label>
                             <Form.Control
                 
                 type = 'password'
                 placeholder='Enter Password'
                 value={password}
                 onChange={ (e) => setPassword(e.target.value)}
                 >  
                         </Form.Control>
                 </Form.Group>

                 <Button type = 'submit' variant='primary'> 
                 Sign In 
                 </Button> 



                 </Form>

                 <Row className='py-3'>
                    
                 <Col>
                      New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                      Register
                        </Link>
                </Col>
                     </Row>


           </FormContainer>

    );
}

export default LoginScreen;



























