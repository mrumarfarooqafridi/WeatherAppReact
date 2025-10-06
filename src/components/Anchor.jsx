// Anchor.jsx
import React from "react";
import { motion } from "framer-motion";

const Anchor = ({ href, text }) => {
  return (
    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <motion.a
        href={href}
        className="text-primary-200 hover:text-accent-400 font-medium transition duration-200 text-[10px] md:text-sm"
        whileHover={{
          color: "rgb(251, 113, 133)", // accent-400
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {text}
      </motion.a>
    </motion.div>
  );
};

export default Anchor;
