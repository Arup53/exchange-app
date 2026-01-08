"use client";
import { motion } from "motion/react";

export default function FourthAnimation() {
  return (
    <div className="flex items-center justify-center ">
      <svg
        width="402"
        height="201"
        viewBox="0 0 402 201"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "translate(120px, -48px)" }}
        className="w-full max-w-2xl"
      >
        <g clipPath="url(#clip0_2961_6831)">
          {/* Background circle */}
          <g opacity="1">
            <circle cx="201" cy="201" r="201" fill="rgba(255, 232, 192, 1)" />
          </g>

          {/* Rotating sun group */}
          <motion.g
            animate={{
              rotate: [-25, 100, -25],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "198.25px 201px" }}
          >
            {/* Sun ring with dot */}
            <circle
              cx="201"
              cy="201"
              r="109.5"
              stroke="rgba(255, 180, 66, 1)"
              strokeWidth="55"
              fill="rgba(255, 232, 192, 1)"
            />
            <circle
              cx="117"
              cy="130"
              r="31"
              fill="rgba(255, 141, 0, 1)"
              stroke="#FCFCFB"
              strokeWidth="12"
            />
          </motion.g>
        </g>

        {/* Clip path definition */}
        <defs>
          <clipPath id="clip0_2961_6831">
            <rect width="402" height="201" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
