"use client";
import { motion } from "motion/react";

export default function ThirdCard() {
  const lightBlue = "#DFF6FF";
  const mediumBlue = "#6BCEF5";
  const backgroundBlue = "#B5E7FA";

  return (
    <div className="max-h-[500px] overflow-hidden">
      <svg
        width="457"
        height="250"
        viewBox="0 0 457 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        {/* Background */}
        <rect width="457" height="250" fill={backgroundBlue} />

        {/* Rotating group */}
        <motion.g
          animate={{ rotate: [0, -30, 30, 0] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "228.5px 250px" }}
        >
          {/* Outer circle - left half */}
          <circle
            mask="url(#outer-mask-1)"
            cx="228.5"
            cy="250"
            r="228.5"
            fill={lightBlue}
          />
          <mask id="outer-mask-1">
            <rect x="0" y="21.5" width="228.5" height="457" fill="white" />
          </mask>

          {/* Outer circle - right half */}
          <circle
            mask="url(#outer-mask-2)"
            cx="228.5"
            cy="250"
            r="228.5"
            fill={mediumBlue}
          />
          <mask id="outer-mask-2">
            <rect x="228.5" y="21.5" width="228.5" height="457" fill="white" />
          </mask>

          {/* Inner circle - right half */}
          <circle
            mask="url(#inner-mask-1)"
            cx="228.684"
            cy="250"
            r="114"
            fill={lightBlue}
          />
          <mask id="inner-mask-1">
            <rect x="228.5" y="136" width="114" height="228" fill="white" />
          </mask>

          {/* Inner circle - left half */}
          <circle
            mask="url(#inner-mask-2)"
            cx="228.684"
            cy="250"
            r="114"
            fill={mediumBlue}
          />
          <mask id="inner-mask-2">
            <rect x="114.5" y="136" width="114" height="228" fill="white" />
          </mask>
        </motion.g>
      </svg>
    </div>
  );
}
