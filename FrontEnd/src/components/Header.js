import React, { useState, useEffect } from 'react';
import { Button, Container, Form, FormControl, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { listBranches } from '../actions/branchActions';

function Header() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const branchList = useSelector(state => state.branchList);
  const { branches } = branchList;

  useEffect(() => {
    dispatch(listBranches());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>CARS 2 GO</Navbar.Brand>
          </LinkContainer>
  
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/mylistings'>
                    <NavDropdown.Item>My Listings</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/cart'>
                    <NavDropdown.Item>My Reservations</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                </LinkContainer>
              )}
              <NavDropdown title="Reservation Options">
              <LinkContainer to='/start-reservation'>
              <NavDropdown.Item>Start Reservation</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/add-product'>
              <NavDropdown.Item>Add Your Car for Rental</NavDropdown.Item>
              </LinkContainer>
              </NavDropdown>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userList'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/reservationlist'>
                    <NavDropdown.Item>Reservations</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/paymentlist'>
                    <NavDropdown.Item>Payments</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
            </Nav>
            <Form className="d-flex" onSubmit={submitHandler}>
              <FormControl
                type="search"
                placeholder="Search Cars"
                className="mr-2"
                aria-label="Search"
                onChange={e => setKeyword(e.target.value)}
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
