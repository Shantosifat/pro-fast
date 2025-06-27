import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../how it works/HowItWorks';
import Services from '../Services/Services';
import CompanySlider from '../logosMarquee/CompanySlider';
import DeliveryFeatures from '../Features/DeliveryFeatures';
import Merchant from '../Merchant/Merchant';
import CustomerReviews from '../CustomerReviews/CustomerReviews';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <CompanySlider></CompanySlider>
            <DeliveryFeatures></DeliveryFeatures>
            <Merchant></Merchant>
            <CustomerReviews></CustomerReviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;