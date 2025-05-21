import React, { useRef, useEffect, useState } from "react";
import Typewriter from "../components/Typewriter";
import CardFlipper from "../components/CardFlipper";

const images = [
  "/images/bg1.avif",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
  "/images/bg5.jpg",
];

export default function TiltPage() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [bgIndex, setBgIndex] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    const maxRotation = 15;
    const rotateX = y * maxRotation * -1;
    const rotateY = x * maxRotation;

    containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToCardFlipper = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-screen h-screen flex items-center justify-center transition-transform duration-300 ease-out bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[bgIndex]})`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="w-[50vh] h-[60vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center justify-between bg-no-repeat bg-top bg-[length:39vh_39vh]"
          style={{
            backgroundImage: `url('/ChatGPT Image May 18, 2025, 08_36_43 AM.png')`,
          }}
        >
          {/* Spacer to push the text below the image */}
          <div className="h-[40vh]"></div>

          {/* Typewriter Text */}
          <div className="text-black font-medium text-align-center">
            <Typewriter />
          </div>

          {/* Button */}
          <button
            onClick={scrollToCardFlipper}
            className="mt-4 px-6 py-2 rounded-md font-semibold bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 text-white animate-shine bg-[length:200%_auto] hover:opacity-90 transition"
          >
            Start Writing
          </button>
        </div>
      </div>
      <div
        ref={cardRef}
        className="min-h-screen w-full flex justify-center items-center snap-start bg-gray-50"
      >
        <CardFlipper />
      </div>
    </>
  );
}
