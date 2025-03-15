import React, { useState } from 'react';
import ProductCard from './ProductCard';
import products from '../../data/products.json';

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover our top-selling and trending products that customers love!
      </p>

      {/* Product Card */}
      <div className="mt-12">
        <ProductCard products={products.slice(0, visibleProducts)} />
      </div>

      {/* Load More Button */}
      {visibleProducts < products.length && (
        <div className="text-center mt-8">
          <button 
            className="btn btn-primary" 
            onClick={loadMoreProducts}
          >
            Load More Products
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
