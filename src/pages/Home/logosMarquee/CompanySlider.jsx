import React from 'react';
import Marquee from 'react-fast-marquee';

// ✅ Import all your logo images here
import logo1 from '../../../assets/brands/amazon.png';
import logo2 from '../../../assets/brands/amazon_vector.png';
import logo3 from '../../../assets/brands/casio.png';
import logo4 from '../../../assets/brands/moonstar.png';
import logo5 from '../../../assets/brands/randstad.png';
import logo6 from '../../../assets/brands/start-people 1.png';
import logo7 from '../../../assets/brands/start.png';


// ✅ Define your array of logos here
const companyLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const CompanySlider = () => {
  return (
    <section className="py-12 bg-white rounded-2xl my-3">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Trusted By Leading Brands</h2>
        <p className="text-gray-500 mt-2">Our logistics services are trusted by these companies</p>
      </div>

      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {companyLogos.map((logo, index) => (
          <div key={index} className="mx-8">
            <img
              src={logo}
              alt={`Company ${index + 1}`}
              className="h-6 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default CompanySlider;
