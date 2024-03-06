import React, { useState } from 'react';
import { NavDropdown, Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Header() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // Instantiate the navigate hook

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`); // Redirect to search page with keyword
    } else {
      navigate('/'); // Redirect to home page if search is empty
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>



          <LinkContainer to='/'>
            <Navbar.Brand>Car Rental</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

              <LinkContainer to='/cart'>
                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/login'>
                <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/start-reservation'>
                <Nav.Link>Start Reservation</Nav.Link>
              </LinkContainer>

            </Nav>
            <Form className="d-flex" onSubmit={submitHandler}>
              <FormControl
                type="search"
                placeholder="Search Cars"
                className="mr-2"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="outline-success" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;