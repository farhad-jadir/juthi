"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Calendar, 
  User, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  ThumbsUp,
  MessageCircle,
  Share2,
  Filter,
  X,
  CheckCircle,
  Clock
} from "lucide-react";

// Types
type ReviewType = {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  review: string;
  avatar?: string;
  likes: number;
  verified: boolean;
  images?: string[];
};

// Reviews Data
const reviews: ReviewType[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    location: "Dhaka, Bangladesh",
    rating: 5,
    date: "2024-02-15",
    service: "Bridal Makeup Package",
    review: "Absolutely amazing experience! Najifa did my bridal makeup and I couldn't be happier. She understood exactly what I wanted and made me feel like a princess on my special day. The makeup lasted all day and night. Highly recommend! 💕",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    likes: 45,
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400",
      "https://images.unsplash.com/photo-1532712936146-f8e1c6ba4b6f?w=400"
    ]
  },
  {
    id: 2,
    name: "Tanvir Hossain",
    location: "Chittagong, Bangladesh",
    rating: 5,
    date: "2024-02-10",
    service: "Signature Haircut",
    review: "Best haircut experience ever! The team is very professional and friendly. They gave me exactly the look I wanted. The attention to detail is impressive. Will definitely come back!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    likes: 23,
    verified: true,
  },
  {
    id: 3,
    name: "Nadia Khan",
    location: "Dhaka, Bangladesh",
    rating: 5,
    date: "2024-02-08",
    service: "Advanced Hydrafacial",
    review: "My skin has never looked better! The hydrafacial treatment was so relaxing and effective. The staff explained every step and made sure I was comfortable. Results were visible immediately. Worth every penny!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    likes: 67,
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400"
    ]
  },
  {
    id: 4,
    name: "Rafiqul Islam",
    location: "Sylhet, Bangladesh",
    rating: 4,
    date: "2024-02-05",
    service: "Beard Styling",
    review: "Great service and professional environment. The stylist knew exactly what would suit my face shape. A bit pricey but worth the quality. Will recommend to friends.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    likes: 12,
    verified: true,
  },
  {
    id: 5,
    name: "Farhana Chowdhury",
    location: "Dhaka, Bangladesh",
    rating: 5,
    date: "2024-02-01",
    service: "Balayage & Glow",
    review: "I'm obsessed with my new hair color! Najifa is a magician with hair. The balayage looks so natural and beautiful. The salon is gorgeous and very clean. Best decision ever! ✨",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    likes: 89,
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400"
    ]
  },
  {
    id: 6,
    name: "Mehedi Hasan",
    location: "Narayanganj, Bangladesh",
    rating: 5,
    date: "2024-01-28",
    service: "Men's Grooming Package",
    review: "Excellent service from start to finish. The team is very professional and attentive. Got the full grooming package and felt like a new person. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    likes: 34,
    verified: true,
  },
  {
    id: 7,
    name: "Tahmina Akter",
    location: "Dhaka, Bangladesh",
    rating: 5,
    date: "2024-01-25",
    service: "Diamond Glow Facial",
    review: "The diamond glow facial is a game changer! My skin feels so smooth and radiant. The aesthetician was very knowledgeable and gentle. Love the results!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    likes: 56,
    verified: true,
  },
  {
    id: 8,
    name: "Shahriar Alam",
    location: "Dhaka, Bangladesh",
    rating: 4,
    date: "2024-01-20",
    service: "Hair Coloring",
    review: "Good experience overall. The color came out exactly as I wanted. The only downside was the waiting time. But the result made up for it. Will come back.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    likes: 18,
    verified: true,
  },
  {
    id: 9,
    name: "Jesmin Sultana",
    location: "Gazipur, Bangladesh",
    rating: 5,
    date: "2024-01-18",
    service: "Bridal Vanity Package",
    review: "Dream come true! The entire bridal package was worth every taka. Najifa and her team made me look absolutely stunning. Thank you for making my wedding day so special! 💖",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
    likes: 112,
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      "https://images.unsplash.com/photo-1532712936146-f8e1c6ba4b6f?w=400"
    ]
  },
  {
    id: 10,
    name: "Imran Hossain",
    location: "Dhaka, Bangladesh",
    rating: 5,
    date: "2024-01-15",
    service: "Hair Transplant Consultation",
    review: "Very professional consultation. They explained everything clearly and gave honest advice. The facility is world-class. Looking forward to the treatment.",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150",
    likes: 27,
    verified: true,
  }
];

// Services list for filter
const servicesList = ["All Services", "Bridal Makeup Package", "Signature Haircut", "Advanced Hydrafacial", "Balayage & Glow", "Diamond Glow Facial", "Men's Grooming Package"];

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

// Review Card Component
function ReviewCard({ review, onClick }: { review: ReviewType; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
            {review.avatar ? (
              <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
            ) : (
              review.name.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{review.name}</h3>
            <p className="text-xs text-gray-500">{review.location}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Service & Date */}
      <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
        <span className="bg-pink-50 text-pink-600 px-2 py-1 rounded-full">
          {review.service}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {review.date}
        </span>
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
        {review.review}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-gray-400 hover:text-pink-600 transition-colors">
            <ThumbsUp size={16} />
            <span className="text-xs">{review.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-400 hover:text-pink-600 transition-colors">
            <MessageCircle size={16} />
            <span className="text-xs">Reply</span>
          </button>
        </div>
        {review.verified && (
          <div className="flex items-center gap-1 text-green-600 text-xs">
            <CheckCircle size={14} />
            Verified Purchase
          </div>
        )}
      </div>

      {/* Images Preview */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-3">
          {review.images.slice(0, 2).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Review ${idx + 1}`}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ))}
          {review.images.length > 2 && (
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
              +{review.images.length - 2}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// Statistics Component
function Statistics({ reviews }: { reviews: ReviewType[] }) {
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const fourStarCount = reviews.filter(r => r.rating === 4).length;
  const threeStarCount = reviews.filter(r => r.rating === 3).length;
  
  const getPercentage = (count: number) => (count / reviews.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Average Rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-pink-600">{averageRating}</div>
          <StarRating rating={parseFloat(averageRating)} />
          <p className="text-sm text-gray-500 mt-1">Based on {reviews.length} reviews</p>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3].map(star => {
            const count = star === 5 ? fiveStarCount : star === 4 ? fourStarCount : threeStarCount;
            const percentage = getPercentage(count);
            return (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span>{star}</span>
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-600 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-gray-500">{count}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">100%</div>
            <p className="text-xs text-gray-500">Verified Buyers</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">5+</div>
            <p className="text-xs text-gray-500">Years of Trust</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Write Review Modal
function WriteReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your review! It will be published after moderation.");
    onClose();
    setRating(0);
    setName("");
    setService("");
    setReview("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Write a Review</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          star <= (hoverRating || rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                  placeholder="Enter your name"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Received *
                </label>
                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                >
                  <option value="">Select a service</option>
                  {servicesList.filter(s => s !== "All Services").map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  required
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                  placeholder="Share your experience..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Reviews() {
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedReview, setSelectedReview] = useState<ReviewType | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter reviews
  const filteredReviews = selectedService === "All Services"
    ? reviews
    : reviews.filter(r => r.service === selectedService);

  // Handle review click
  const handleReviewClick = (review: ReviewType, index: number) => {
    setSelectedReview(review);
    setCurrentIndex(index);
  };

  // Navigate through reviews
  const nextReview = () => {
    if (currentIndex < filteredReviews.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedReview(filteredReviews[newIndex]);
    }
  };

  const prevReview = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedReview(filteredReviews[newIndex]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-pink-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Client <span className="text-pink-600">Reviews</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from our amazing clients. See why they love GLAM & GLOW by Najifa
          </p>
        </motion.div>

        {/* Statistics */}
        <Statistics reviews={reviews} />

        {/* Filter and Write Review Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <Filter size={18} className="text-gray-500" />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="bg-transparent outline-none text-gray-700 text-sm cursor-pointer"
            >
              {servicesList.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredReviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              onClick={() => handleReviewClick(review, index)}
            />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredReviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No reviews found for this service.</p>
            <button
              onClick={() => setSelectedService("All Services")}
              className="mt-4 text-pink-600 hover:underline"
            >
              View all reviews
            </button>
          </motion.div>
        )}

        {/* Review Detail Modal */}
        <AnimatePresence>
          {selectedReview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelectedReview(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Review Details</h2>
                  <button onClick={() => setSelectedReview(null)} className="p-1 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                        {selectedReview.avatar ? (
                          <img src={selectedReview.avatar} alt={selectedReview.name} className="w-full h-full object-cover" />
                        ) : (
                          selectedReview.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{selectedReview.name}</h3>
                        <p className="text-sm text-gray-500">{selectedReview.location}</p>
                      </div>
                    </div>
                    <StarRating rating={selectedReview.rating} />
                  </div>

                  {/* Service & Date */}
                  <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                    <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full">
                      {selectedReview.service}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {selectedReview.date}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {selectedReview.review}
                  </p>

                  {/* Quote */}
                  <div className="bg-pink-50 rounded-xl p-4 mb-4">
                    <Quote size={20} className="text-pink-400 mb-2" />
                    <p className="text-gray-600 italic text-sm">
                      {selectedReview.review.substring(0, 150)}...
                    </p>
                  </div>

                  {/* Images */}
                  {selectedReview.images && selectedReview.images.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Photos</h4>
                      <div className="flex gap-2">
                        {selectedReview.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Review ${idx + 1}`}
                            className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors">
                        <ThumbsUp size={18} />
                        <span>{selectedReview.likes} Helpful</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors">
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>
                    </div>
                    {selectedReview.verified && (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle size={14} />
                        Verified Purchase
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="border-t border-gray-100 p-4 flex justify-between">
                  <button
                    onClick={prevReview}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  <button
                    onClick={nextReview}
                    disabled={currentIndex === filteredReviews.length - 1}
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Write Review Modal */}
        <WriteReviewModal isOpen={isWriteModalOpen} onClose={() => setIsWriteModalOpen(false)} />
      </div>
    </div>
  );
}