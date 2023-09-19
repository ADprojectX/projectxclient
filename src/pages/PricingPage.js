import React from 'react';
import PricingCard from '../components/PricingCard';

const PricingPage = () => {
    
	return (
        <div>
            <PricingCard 
                api_url="API_URL"
                button_name="Checkout"
                price="15.00" 
                plan_name="Basic Plan"
            />
        </div>

	);
};

export default PricingPage;