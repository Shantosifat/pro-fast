import React from 'react';
import {
  FaTruck,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from 'react-icons/fa';

const ourServices = [
  {
    icon: <FaTruck className="text-5xl text-blue-600 mx-auto mb-4" />,
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
  },
  {
    icon: <FaMapMarkedAlt className="text-5xl text-green-600 mx-auto mb-4" />,
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
  },
  {
    icon: <FaWarehouse className="text-5xl text-purple-600 mx-auto mb-4" />,
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
  },
  {
    icon: <FaMoneyBillWave className="text-5xl text-orange-600 mx-auto mb-4" />,
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
  },
  {
    icon: <FaBuilding className="text-5xl text-red-500 mx-auto mb-4" />,
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
  },
  {
    icon: <FaUndoAlt className="text-5xl text-teal-600 mx-auto mb-4" />,
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-[#03373D] rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
        <p className="max-w-2xl mx-auto mb-12 text-white/80">
          We offer a wide range of logistics and delivery solutions tailored to your business needs—fast, secure, and reliable.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {ourServices.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg 
                         hover:bg-teal-600 hover:shadow-2xl 
                         transition duration-300 ease-in-out
                         cursor-pointer"
            >
              {/* Icon color changes on hover */}
              <div className="group-hover:text-white transition duration-300">
                {React.cloneElement(service.icon, { className: `${service.icon.props.className} group-hover:text-white` })}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-black mb-3 text-center hover:text-white transition duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-900 group-hover:text-white hover:text-white text-sm leading-relaxed transition duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
