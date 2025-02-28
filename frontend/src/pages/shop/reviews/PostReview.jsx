import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../../../redux/features/product/productApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';

const PostReview = ({ isModalOpen, handleClose, refetch }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  // Fetch product data (optional in this context)
  useFetchProductByIdQuery(id, { skip: !id });

  // Mutation for posting a review
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      comment,
      rating,
      userId: user?._id,
      productId: id,
    };

    try {
      await postReview(newComment).unwrap();
      alert('Comment posted successfully!');
      setComment('');
      setRating(0);
      if (refetch) refetch(); 
      handleClose(); 
    } catch (error) {
      alert(error?.data?.message || 'Failed to post the comment');
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? 'flex' : 'hidden'
      }`}
    >
      <div className="bg-white py-6 px-4 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Post A Review</h2>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-500 text-lg"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>

        {/* Comment Input */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          placeholder="Write your comment here..."
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition mb-4"
        >
          Submit
        </button>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="w-full px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostReview;
