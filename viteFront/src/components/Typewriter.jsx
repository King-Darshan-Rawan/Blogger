import React, { useEffect, useState } from "react";

const texts = [
  "Please write your opinion",
  "Share your thoughts with us...",
  "Understand others better",
  "Express freely, anonymously",
  "Your words matter here"
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <div className="text-xl md:text-2xl font-semibold text-center w-full overflow-hidden whitespace-nowrap">
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default Typewriter;
