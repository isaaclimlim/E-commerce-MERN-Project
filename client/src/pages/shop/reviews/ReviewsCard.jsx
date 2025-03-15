import React, { useState } from 'react';
import commentorIcon from '../../../assets/avatar.png';
import { formatDate } from '../../../utils/formatDate';
import RatingStars from '../../../components/RatingStars';
import PostReview from './PostReview';

const ReviewsCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = productReviews || [];

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative my-6 bg-white shadow-md rounded-lg p-6">
      {reviews.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            All Comments
          </h3>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <img
                    src={commentorIcon}
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="mb-2">
                      <p className="text-lg font-medium text-blue-500 capitalize">
                        {review?.userId?.username || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {formatDate(review.updatedAt)}
                      </p>
                    </div>
                    <p className="text-gray-700 bg-gray-100 p-3 rounded-md border border-gray-200">
                      {review.comment || 'No comment provided.'}
                    </p>
                    <div className="mt-2">
                      <RatingStars rating={review.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No reviews yet!</p>
      )}

      {/* Add Review Button */}
      <div className="mt-8">
        <button
          onClick={handleOpenReviewModal}
          className="px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Add Review
        </button>
      </div>

      {/* Review Modal */}
      <PostReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
    </div>
  );
};

export default ReviewsCard;
