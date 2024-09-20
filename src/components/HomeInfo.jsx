import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@react-three/drei';
import arrow from '../assets/icons/arrow.svg'; // Adjust the import path as needed

const InfoBox = ({ text, link, btnText }) => {
  return (
    <div className="info-box">
      <p className='font-medium text-center sm:text-xl'>
        {text}
      </p>
      <Link to={link} className='neo-brutalism-white neo-btn'>
        {btnText}
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
  );
};

const renderContent = {
  1: (
    <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
      Hi, I'm
      <span className='font-semibold mx-2 text-white'>Deepak Kumar Saxena</span>
      👋
      <br />
      A Software Engineer from India 🇮🇳
    </h1>
  ),
  2: (
    <InfoBox
      text="Worked with many companies and picked up many skills along the way"
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="I'm a full-stack developer with a passion for web development and design"
      link="/projects"
      btnText="See my work"
    />
  ),
  4: (
    <InfoBox
      text="I'm always looking for opportunities to learn and grow"
      link="/contact"
      btnText="Contact me"
    />
  )
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
