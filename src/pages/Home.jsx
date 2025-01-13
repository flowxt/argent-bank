import React from 'react';
import chatIcon from '../assets/images/icon-chat.png';
import moneyIcon from '../assets/images/icon-money.png';
import securityIcon from '../assets/images/icon-security.png';
import Hero from '../components/Hero';
import Feature from '../components/Feature';

const Home = () => {
    return (
        <main>
            <Hero />
<section className='features'>
<Feature
icon= {chatIcon}
title="You are our #1 priority"
description = "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
/>
<Feature 
icon={moneyIcon}
title="More savings means higher rates"
description="The more you save with us, the higher your interest rate will be!"
/>
<Feature
icon={securityIcon}
title="Security you can trust"
description="We use top of the line encryption to make sure your data and money is always safe."
/>
</section>
        </main>
    );
};

export default Home;