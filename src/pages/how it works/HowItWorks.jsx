import React from 'react';
import { FaShoppingCart, FaMapMarkedAlt, FaTruck, FaBoxOpen } from 'react-icons/fa';

const steps = [
  {
    icon: <FaShoppingCart className="text-4xl text-blue-600" />,
    title: 'Place Your Order',
    description: 'Browse the app and order your favorite items in just a few taps.',
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-green-600" />,
    title: 'Track in Real-Time',
    description: 'Track your delivery live on the map once your order is confirmed.',
  },
  {
    icon: <FaTruck className="text-4xl text-orange-600" />,
    title: 'Fast Delivery',
    description: 'Our drivers deliver your order quickly and safely to your doorstep.',
  },
  {
    icon: <FaBoxOpen className="text-4xl text-purple-600" />,
    title: 'Enjoy!',
    description: 'Unbox, enjoy your items, and don’t forget to rate your experience.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-50 rounded-2xl mb-2">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
