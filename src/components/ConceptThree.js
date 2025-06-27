import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConceptThree = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the products page as ConceptThree now has separate routes
    navigate('/concept3-products', { replace: true });
  }, [navigate]);

  return (
    <div className="container h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Redirecting to Products...</h2>
        <p className="text-secondary">ConceptThree now has separate routes for products and cart.</p>
      </div>
    </div>
  );
};

export default ConceptThree; 