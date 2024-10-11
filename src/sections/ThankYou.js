import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
   const navigate = useNavigate();

   const handleReturnHome = () => {
      navigate('/');
   };

   return (
      <div className="thank-you-container">
         <div className="thank-you-card">
            <h2>Thank You for Your Purchase!</h2>
            <p>Your order has been placed successfully.</p>
            <button onClick={handleReturnHome}>
               Return to Home
            </button>
         </div>
      </div>
   );
};

export default ThankYou;
