import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        

        <Card.Text as="h3">
          ${product.price} per day
        </Card.Text>

        <Card.Text>
          Branch: {product.branch?.branch_name || 'No branch info'}
        </Card.Text>

        {/* Displaying branch address */}
        <Card.Text>
          Address: {product.branch?.address ? `${product.branch.address}, ${product.branch.city}, ${product.branch.postalCode}, ${product.branch.country}` : 'No address info'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
