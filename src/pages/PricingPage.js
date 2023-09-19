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
            <PricingCard 
                api_url="API_URL"
                button_name="Checkout"
                price="25.00" 
                plan_name="Premium Plan"
            />
            <PricingCard 
                api_url="API_URL"
                button_name="Checkout"
                price="10.00" 
                plan_name="Credits"
            />
        </div>
	);
};

export default PricingPage;