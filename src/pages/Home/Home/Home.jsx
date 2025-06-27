import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../how it works/HowItWorks';
import Services from '../Services/Services';
import CompanySlider from '../logosMarquee/CompanySlider';
import DeliveryFeatures from '../Features/DeliveryFeatures';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <CompanySlider></CompanySlider>
            <DeliveryFeatures></DeliveryFeatures>
        </div>
    );
};

export default Home;