import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../how it works/HowItWorks';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
        </div>
    );
};

export default Home;