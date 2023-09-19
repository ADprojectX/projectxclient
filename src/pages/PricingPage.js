import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css'
// import '../bulma/css/bulma.css';
const PricingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/pricing/page/')
      .then(response => {
        console.log('Response:', response.data);  // Log the response
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Pricing Page</h1>
      <section>
        <p className="heading">Pricing Plans</p>
        <div className="columns">
          {products.map(product => (
            <div className="column" key={product.name}>
              <p className="subtitle">{product.name}</p>
              {product.plans.map(plan => (
                <div key={plan.nickname}>
                  <p className="heading">{plan.nickname}</p>
                  <p>{plan.price}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
