import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function ProductDescriptionPage() {
  const { productId } = useParams();

  const location = useLocation();
  console.log(location.state,'location');

  return (
    <div>
      <h2>Product Description</h2>
    </div>
  );
}

export default ProductDescriptionPage;