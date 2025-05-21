import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Emily Watson",
    title: "Operations Director at CloudScale",
    description:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    image: "./../../public/profile/img1.jpg",
  },
  {
    name: "John Doe",
    title: "Lead Engineer at SoftLabs",
    description:
      "A revolutionary way to streamline communication and manage team workflows effortlessly.",
    image: "./../../public/profile/img2.jpg",
  },
  {
    name: "Sophia Lee",
    title: "UX Designer at BrightMind",
    description:
      "Incredible visuals and interaction! This UI keeps users engaged like never before.",
    image: "./../../public/profile/img3.webp",
  },
];

export default function CardFlipper() {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const ordered = [
    testimonials[(index + 2) % testimonials.length],
    testimonials[(index + 1) % testimonials.length],
    testimonials[index],
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center px-8">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl">
        {/* LEFT STACKED IMAGES */}
        <div className="relative w-[300px] h-[380px]">
          {ordered.map((item, i) => (
            <motion.img
              key={item.image}
              src={item.image}
              alt={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: i === 2 ? 1 : 0.5,
                scale: i === 2 ? 1 : 0.9,
                rotate: (i - 1) * 5,
                zIndex: i,
              }}
              transition={{ duration: 0.5 }}
              className={`absolute w-full h-full object-cover rounded-2xl shadow-xl cursor-pointer ${
                i === 2 ? "border-4 border-white" : ""
              }`}
              style={{ top: `${i * 5}px`, left: `${i * 5}px` }}
            />
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[index].name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold">{testimonials[index].name}</h2>
              <p className="text-gray-400">{testimonials[index].title}</p>
              <p className="mt-4 text-lg text-gray-200 max-w-xl">
                {testimonials[index].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            >
              <ArrowRight />
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={() => (window.location.href = "/blog")}
              className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
            >
              Read Full Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
