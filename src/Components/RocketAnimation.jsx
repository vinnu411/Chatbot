import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import React from "react";

 function RocketAnimation() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 bg-[url('https://www.nasa.gov/sites/default/files/thumbnails/image/stsci-h-p2016a-m-2000x1500_0.png')] bg-cover bg-center opacity-30"></div>
      
      {/* Rocket Animation */}
      <motion.div
        initial={{ x: "100vw", y: "50vh", rotate: 0 }}
        animate={{ x: "-10vw", y: "10vh", rotate: -20 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute text-white text-6xl"
      >
        <FaRocket className="text-red-500" />
      </motion.div>
    </div>
  ); 
}
export default RocketAnimation;