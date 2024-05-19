import React from 'react';
import HomeHero from '../components/HomeHero';
import LatestRessources from '../components/LatestRessources';
import Hero from '../components/Hero/Hero';

const Home = () => {

    return (
        <React.Fragment>
            <HomeHero />
            <LatestRessources />
            <Hero 
                title="About Us" 
                subtitle="We are a team of professionals who are passionate about technology and programming. We are dedicated to providing the best resources and tutorials to help you learn and grow as a developer." 
                imageSide="left" 
                image="https://placehold.co/600x400/png" 
                buttonText="Learn More" 
                buttonLink="/about" 
                backgroundColorClass="bg-gray-100 dark:bg-neutral-800"
                titleColorClass="text-gray-800 dark:text-white"
                subtitleColorClass="text-gray-800 dark:text-neutral-400"
            />
            <Hero 
                title="About Us" 
                subtitle="We are a team of professionals who are passionate about technology and programming. We are dedicated to providing the best resources and tutorials to help you learn and grow as a developer." 
                imageSide="right" 
                image="https://placehold.co/600x400/png" 
                buttonText="Learn More" 
                buttonLink="/about" 
                backgroundColorClass="bg-gray-100 dark:bg-neutral-800"
                titleColorClass="text-gray-800 dark:text-white"
                subtitleColorClass="text-gray-800 dark:text-neutral-400"
                secondButtonLink="/"
                secondButtonText="text"
            />
            <Hero 
                title="About Us" 
                subtitle="We are a team of professionals who are passionate about technology and programming. We are dedicated to providing the best resources and tutorials to help you learn and grow as a developer." 
                buttonText="Learn More" 
                buttonLink="/about" 
                textCenter={true}
                backgroundColorClass="bg-gray-100 dark:bg-neutral-800"
                titleColorClass="text-gray-800 dark:text-white"
                subtitleColorClass="text-gray-800 dark:text-neutral-400"
            />
        </React.Fragment>
    )
}

export default Home;