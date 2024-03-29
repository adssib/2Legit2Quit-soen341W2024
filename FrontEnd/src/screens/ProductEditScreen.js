import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
function PaymentScreen() {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: Add your payment processing logic here
        console.log({ cardName, cardNumber, expMonth, expYear, cvv });
        alert('Payment info submitted');
        navigate('/'); // Redirect to the homepage
    };
=======

function ProductEditScreen() {

   // Replace match.params.id with useParams
   const { id: productId } = useParams();
   const navigate = useNavigate(); // Replace history with useNavigate for navigation

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [address, setAddress] = useState('');
    const [branches, setBranches] = useState([]); // Holds the list of branches


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/productlist');
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
                setAddress(product.address); // Add this line
                
            }
        }
    }, [dispatch, navigate, productId, product, successUpdate]);
    

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
            address
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }
>>>>>>> 8e1cb89d6ad7eaea88fc5570568cd2de2520bbca

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Payment Information</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="cardName">
                            <Form.Label>Cardholder's Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name on card"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Valid card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="expMonth">
                                    <Form.Label>Expiration Month</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="MM"
                                        value={expMonth}
                                        onChange={(e) => setExpMonth(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="expYear">
                                    <Form.Label>Expiration Year</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="YYYY"
                                        value={expYear}
                                        onChange={(e) => setExpYear(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </Form.Group>

<<<<<<< HEAD
                        <Button type="submit" variant="primary">
                            Submit Payment
=======
                            </Form.Group>


                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='address'>
    <Form.Label>Address</Form.Label>
    <Form.Control
        type='text'
        placeholder='Enter address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
    ></Form.Control>
</Form.Group>



                            <Button type='submit' variant='primary'>
                                Update
>>>>>>> 8e1cb89d6ad7eaea88fc5570568cd2de2520bbca
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default PaymentScreen;
