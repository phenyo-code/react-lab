"use client";
import React from 'react';


import { FaStar } from 'react-icons/fa';
import { Star } from 'lucide-react';
import AnimatedSVG from '../components/animations/AnimatedSVG';

const App = () => (
  <div>
    <AnimatedSVG
      type="icon"
      effect="iconNeonDraw"
      Icon={FaStar}
      strokeColor="#ff6ac1"
      glowColor="rgba(255, 106, 193, 0.7)"
      duration={Infinity}
      delay={0.5}
      className="my-icon"
    />
    <AnimatedSVG
      type="icon"
      effect="iconNeonDraw"
      Icon={Star}
      strokeColor="#ff4500"
      glowColor="rgba(255, 69, 0, 0.8)"
      duration={Infinity}
      delay={0.5}
      className="my-icon"
    />
  </div>
);

export default App;