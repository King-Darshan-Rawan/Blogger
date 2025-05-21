import React from "react";
import { motion } from "framer-motion";

const BlogPreview = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl w-[80vw] h-[70vh] flex overflow-hidden relative"
      >
        <div className="w-1/2 h-full">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>
        <div className="w-1/2 h-full p-6 overflow-y-scroll relative">
          <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
          <div className="text-base text-gray-800 whitespace-pre-line">
            {blog.content}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPreview;
