import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/product/productApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddToCart = (product) => {
    const productToAdd = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    dispatch(addToCart(productToAdd));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details</p>;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct?.image}
              alt={singleProduct?.name}
              className="rounded-md w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">{singleProduct?.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${singleProduct?.price}
              {singleProduct?.oldPrice && (
                <s className="text-gray-500 ml-2">${singleProduct?.oldPrice}</s>
              )}
            </p>
            <p className="text-gray-700 mb-4">{singleProduct?.description}</p>

            <div>
              <p>
                <strong>Category:</strong> {singleProduct?.category}
              </p>
              <p>
                <strong>Color:</strong> {singleProduct?.color}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(singleProduct);
                }}
                className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;
