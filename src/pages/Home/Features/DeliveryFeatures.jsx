import React from 'react';
import fig1 from '../../../assets/illustration/Transit warehouse.png';
import fig2 from '../../../assets/illustration/Vector.png';

const features = [
  {
    title: 'Live Parcel Tracking',
    description:
      'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.',
    image: fig1,
  },
  {
    title: '100% Safe Delivery',
    description:
      'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    image: fig2,
  },
  {
    title: '24/7 Call Center Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns — anytime you need us.',
    image: fig2,
  },
];

const DeliveryFeatures = () => {
  return (
    <section className="bg-gray-100 py-12 rounded-2xl my-3 px-4 md:px-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-start gap-6 hover:bg-gray-50 transition"
          >
            {/* Illustration Image */}
            <div className="w-full md:w-1/4 h-40 flex-shrink-0">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-contain"
              />
            </div>
             {/* Divider */}
            <div className="hidden md:block w-px h-40 bg-gray-300"></div>

            {/* Text Content */}
            <div className="md:w-3/4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryFeatures;
