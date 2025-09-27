"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Telugu brand text
const text = "చా లా బాగుంధి";

// Split properly into graphemes (so Telugu stays intact)
const segmenter = new Intl.Segmenter("te", { granularity: "grapheme" });
const letters = [...segmenter.segment(text)].map((seg) => seg.segment);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // delay between each letter
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 10 },
  },
};

export const Logo = () => {
  return (
    <Link to="/">
      <motion.span
        className="flex gap-[2px] font-semibold text-[#184d46]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={
              index === 0
                ? "text-xl md:text-4xl "
                : "text-sm md:text-xl mt-1.5 md:mt-3"
            }
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Link>
  );
};
