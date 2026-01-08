"use client";
import { motion } from "motion/react";

const CircleLayer = ({ radius, scale, colors, delay = 0 }) => (
  <motion.g
    animate={{ scale: [scale, scale * 0.95, scale] }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
    style={{ transformOrigin: "147px 0px" }}
  >
    <circle
      mask="url(#mask-left)"
      cx="147"
      cy="0"
      r={radius}
      fill={colors.left}
    />
    <circle
      mask="url(#mask-right)"
      cx="147"
      cy="0"
      r={radius}
      fill={colors.right}
    />
  </motion.g>
);

export default function FirstAnimation() {
  const lightestBlue = "#DFF6FF";
  const lightBlue = "#B5E7FA";
  const mediumBlue = "#6BCEF5";

  const layers = [
    {
      radius: 147,
      scale: 0.949231,
      colors: { left: lightestBlue, right: mediumBlue },
      delay: 0,
    },
    {
      radius: 121,
      scale: 0.92488,
      colors: { left: mediumBlue, right: lightBlue },
      delay: 0.3,
    },
    {
      radius: 71,
      scale: 0.904249,
      colors: { left: lightestBlue, right: mediumBlue },
      delay: 0.6,
    },
  ];

  return (
    <svg
      width="268"
      height="150"
      viewBox="0 0 268 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {layers.map((layer, index) => (
        <CircleLayer
          key={index}
          radius={layer.radius}
          scale={layer.scale}
          colors={layer.colors}
          delay={layer.delay}
        />
      ))}

      <defs>
        <mask id="mask-left">
          <rect x="0" y="-147" width="147" height="294" fill="white" />
        </mask>
        <mask id="mask-right">
          <rect x="147" y="-147" width="147" height="294" fill="white" />
        </mask>
      </defs>
    </svg>
  );
}
