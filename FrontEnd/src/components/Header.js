import React, { useState } from 'react';
import { Button, Container, Form, FormControl, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { logout } from '../actions/userActions';


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

  const userLogin = useSelector (state => state.userLogin)

  const {userInfo} = userLogin  

  const dispatch = useDispatch()

  const logoutHandler = () => {
     dispatch(logout()) 
  }

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

             {userInfo ? (
              <NavDropdown title = {userInfo.name} id = 'username'  >
                        <LinkContainer to='/profile'> 
                        <NavDropdown.Item > Profile </NavDropdown.Item>
                        </LinkContainer>

                        <NavDropdown.Item onClick = {logoutHandler}> Logout </NavDropdown.Item>

              </NavDropdown>

             ) : (
              <LinkContainer to='/login'>
              <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
            </LinkContainer>

             )}

              <LinkContainer to='/start-reservation'>
                <Nav.Link>Start Reservation</Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.isAdmin && (
                 <NavDropdown title = 'Admin' id = 'adminmenu'  >
                 <LinkContainer to='/admin/userList'> 
                 <NavDropdown.Item >Users </NavDropdown.Item>
                 </LinkContainer>

                 <LinkContainer to='/admin/productlist'> 
                 <NavDropdown.Item >Products </NavDropdown.Item>
                 </LinkContainer>

                 <LinkContainer to='/admin/orderlist'> 
                 <NavDropdown.Item >Orders </NavDropdown.Item>
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
