import React, { Children }  from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

function FromContainer({children}) {
         
      return (

        <Container>

           <Row className = "justify-content-md-center" >
           <Col xs ={12} medium = {6} > 
             {children}         
           </Col>
           </Row>

        </Container>
      )
      
}

export default FromContainer