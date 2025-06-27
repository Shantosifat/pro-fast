import React from "react";
import image from '../../../assets/location-merchant.png'

const Merchant = () => {
  return (
    <div>
      <div className="bg-no-repeat bg-[url('assets/be-a-merchant-bg.png')] p-20 bg-[#03373D] rounded-2xl my-3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={image}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
            <p className="py-6">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>
            <button className="btn rounded-full btn-secondary mr-3">Become a Merchant</button>
            <button className="btn rounded-full btn-outline">Earn with Profast Courier</button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
