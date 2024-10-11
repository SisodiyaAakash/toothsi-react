import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
   const navigate = useNavigate();

   const handleReturnHome = () => {
      navigate('/');
   };

   return (
      <div className="thank-you-container">
         <div className="thank-you-card">
            <h2>404 - Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={handleReturnHome}>
               Return to Home
            </button>
         </div>
      </div>
   );
};

export default NotFound;
