import React, {useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

function ProductScreen() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({}); // Initialize as an object

    useEffect(() => {
        async function fetchProduct() {
            const {data} = await axios.get(`/api/products/${id}`); // Use `id` directly
            setProduct(data);
        }
  
        fetchProduct();
  
    }, [id]); // Include `id` in the dependency array

    const handleReserveClick = () => {
        navigate('/start-reservation', { state: { selectedProductId: product._id } });
    };

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'Available' : 'Unavailable'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className='btn-block' disabled={product.countInStock === 0} type='button' onClick={handleReserveClick}>Reserve</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;
