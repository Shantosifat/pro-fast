import React, { useState } from 'react';
import img from '../../../assets/customer-top.png'

// Dummy 10 reviews
const reviews = [
  {
    name: 'Awlad Hossin',
    role: 'Senior Product Designer',
    message:
      'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Rasel Ahamed',
    role: 'CTO',
    message:
      'It helped me improve my posture at work and relieved my back pain significantly. Highly recommended for desk workers.',
  },
  {
    name: 'Nasir Uddin',
    role: 'CEO',
    message:
      'Great support and noticeable results in just a few weeks. The customer service was also excellent.',
  },
  {
    name: 'Sarah Khan',
    role: 'Marketing Manager',
    message:
      'I never realized how bad my posture was until I started using this. It’s become part of my daily routine.',
  },
  {
    name: 'John Doe',
    role: 'Developer',
    message:
      'Simple, comfortable, and effective. I can wear it under my shirt during work hours easily.',
  },
  {
    name: 'Mehedi Hasan',
    role: 'UI Designer',
    message:
      'From the packaging to the instructions, everything felt professional and high quality.',
  },
  {
    name: 'Ayesha Siddiqua',
    role: 'Fitness Coach',
    message:
      'Posture Pro has been a game changer for my clients who work long hours sitting.',
  },
  {
    name: 'Tanvir Rahman',
    role: 'Product Manager',
    message:
      'I’ve recommended this to my whole team. It genuinely improves how I sit and work.',
  },
  {
    name: 'Farhana Akter',
    role: 'Therapist',
    message:
      'Scientifically designed and very helpful in long-term posture correction strategies.',
  },
  {
    name: 'Rafiq Islam',
    role: 'Entrepreneur',
    message:
      'Lightweight, easy to wear, and already feeling the difference in my shoulders.',
  },
];

// Pagination config
const REVIEWS_PER_PAGE = 1;

const CustomerReviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const currentReviews = reviews.slice(
    currentPage * REVIEWS_PER_PAGE,
    (currentPage + 1) * REVIEWS_PER_PAGE
  );

  return (
    <section className="bg-gray-50 rounded-2xl py-16 px-4 md:px-20 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <img
          src={img}
          alt="Review Illustration"
          className="mx-auto mb-4 h-20"
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          What our customers are saying
        </h2>
        <p className="text-gray-600 mt-2">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        {/* Review Card */}
        <div className="mt-10 flex justify-center">
          {currentReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white px-6 py-8 rounded-xl shadow-md w-full md:w-2/3"
            >
              <span className="text-4xl text-gray-300 leading-none">“</span>
              <p className="text-gray-700 text-base mt-2">{review.message}</p>
              <div className="mt-6 border-t border-dashed pt-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-gray-800">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            ‹
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-3 h-3 rounded-full ${
                currentPage === idx ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
