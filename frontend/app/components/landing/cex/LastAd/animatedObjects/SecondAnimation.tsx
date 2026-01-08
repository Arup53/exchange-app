"use client";
import { motion } from "motion/react";

const SemicirclePair = ({ cx, animateY, duration }) => (
  <motion.g
    animate={{ y: [animateY, -animateY, animateY] }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{ transformOrigin: `${cx}px 150px` }}
  >
    <path
      d={`M${cx} 0C${cx - 82.843} 0 ${cx - 150} 67.157 ${cx - 150} 150C${
        cx - 150
      } 232.843 ${cx - 82.843} 300 ${cx} 300L${cx} 0Z`}
      fill="#FFD7B3"
    />
    <path
      d={`M${cx} 0C${cx + 82.843} 0 ${cx + 150} 67.157 ${cx + 150} 150C${
        cx + 150
      } 232.843 ${cx + 82.843} 300 ${cx} 300L${cx} 0Z`}
      fill="#FF8947"
    />
  </motion.g>
);

export default function SecondAnimation() {
  const semicircles = [
    { cx: 323, animateY: -9.64708, duration: 4 },
    { cx: 473, animateY: -11.9242, duration: 5 },
  ];

  return (
    <svg
      width="473"
      height="150"
      viewBox="0 0 473 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <g transform="translate(0 -150)">
        {semicircles.map((circle, index) => (
          <g
            key={index}
            style={{
              mixBlendMode: "multiply",
              transformOrigin: `${circle.cx}px 150px`,
            }}
          >
            <SemicirclePair
              cx={circle.cx}
              animateY={circle.animateY}
              duration={circle.duration}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
