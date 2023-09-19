import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string';

const PricingCard = ({ api_url, button_name, price, plan_name }) => {
    
	const location = useLocation();

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		// const query = new URLSearchParams(window.location.search);
		const values = QueryString.parse(location.search);

		if (values.success) {
			console.log(
				'Order placed! You will receive an email confirmation.'
			);
		}

		if (values.canceled) {
			console.log(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, []);

	return (
		<section>
			<div className='product'>
				<div className='description'>
					<h3>{plan_name}</h3>
					<h5>${price}</h5>
				</div>
			</div>
			<form
				action={`${api_url}`}
				method='POST'
			>
				<button className='button' type='submit'>
					{button_name}
				</button>
			</form>
		</section>
	);
};

export default PricingCard;