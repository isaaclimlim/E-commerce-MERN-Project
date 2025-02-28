import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/header3.jpg"


const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">UP TO 20% Discount on</h4>
        <h1>Girl's Fashion</h1>
        <p>
          Welcome to our girl's fashion website, where style meets elegance! Discover the latest trends and timeless classics in our carefully curated collection. From chic dresses to cozy sweaters, we have everything to make your little one shine. Enjoy exclusive discounts and shop with confidence, knowing that each piece is crafted with love and attention to detail. Join us in celebrating the beauty and joy of girl's fashion!
        </p>

        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="banner image" />
      </div>
    </div>
  );
};

export default Banner;
