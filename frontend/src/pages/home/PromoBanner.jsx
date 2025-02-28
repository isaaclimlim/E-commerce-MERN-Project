import React from 'react';

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <div className="banner__card">
        <span><i className="ri-truck-line"></i></span>
        <h4>Free Delivery</h4>
        <p>Offers convenience and the ability to shop anywhere, anytime</p>
      </div>

      <div className="banner__card">
        <span><i className="ri-money-dollar-circle-line"></i></span>
        <h4>Secure Payments</h4>
        <p>Ensures safe and reliable transactions for your purchases</p>
      </div>

      <div className="banner__card">
        <span><i className="ri-user-voice-fill"></i></span>
        <h4>Customer Support</h4>
        <p>24/7 assistance to resolve all your queries</p>
      </div>
    </section>
  );
};

export default PromoBanner;
